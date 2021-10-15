import express from 'express';
import dotenv from 'dotenv';

import { IUnit, IUnitData, IUnitUpdateData } from 'wtp-shared';

// Google Auth Client
import { OAuth2Client, TokenPayload } from 'google-auth-library';
const client = new OAuth2Client(process.env.CLIENT_ID);

// Someone please explain why this didn't work in a separate d.ts file
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

// Load env variables from config in development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// Initialize Cloudant DB
const Cloudant = require('@cloudant/cloudant');
const cloudant = new Cloudant({ url: process.env.CLOUDANT_URL, plugins: { iamauth: { iamApiKey: process.env.CLOUDANT_API_KEY } } });

const db = cloudant.use('wtp');

const app = express();
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use(function (_, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
  });
}

async function getUserUnit(user: TokenPayload) {
  const unitData = (await db.get('unit_data')) as IUnitData;

  const unit = Object.keys(unitData).find((unit) => unitData[unit as keyof IUnitData].members?.includes(user.email as string));
  return unit ? unit.replaceAll('"', '') : undefined;
}

app.use((req, _, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];

    client
      .verifyIdToken({ idToken, audience: process.env.CLIENT_ID })
      .then((ticket) => {
        req.user = ticket.getPayload();
      })
      .finally(next);
  } else next();
});

app.get('/api/unit-data', async (req, res) => {
  let json = (await db.get('unit_data')) as IUnitData;

  let userUnit = req.user ? await getUserUnit(req.user) : undefined;

  for (let unit in json) {
    if (userUnit === unit) continue;
    
    delete json[unit as keyof IUnitData].members;
    delete json[unit as keyof IUnitData].gDrive;
  }

  res.json(json);
});

app.get('/api/me/unit', async (req, res) => {
  if (!req.user) {
    res.status(401).send('Not authenticated.');
    return;
  }

  const unit = await getUserUnit(req.user);

  if (!unit) {
    res.status(400).send('You are not a part of a unit.');
    return;
  }

  res.json(unit);
});

app.post('/api/update-units', async (req, res) => {
  const { data }: { data: IUnitUpdateData; token: any } = req.body;

  if (!req.user) {
    res.status(401).send('Not authenticated.');
    return;
  }

  const { sub } = req.user;
  if (sub && sub !== process.env.ADMIN_SUB) {
    res.status(401).send('You are not an administrator.');
    return;
  }

  const unitData = await db.get('unit_data');

  let updateUnitId = data.unitId;

  // Copy data into new object
  const updateObj = { ...data } as any;
  delete updateObj.unitId;

  unitData[updateUnitId] = Object.assign(unitData[updateUnitId], updateObj);

  try {
    await db.insert(unitData);
  } catch {
    res.status(500).send('Failed to update unit data.');
  } // Prevent document update conflict from client spamming update requests

  res.status(200).send('Successfully updated unit data.');
});

module.exports = app;

if (process.env.NODE_ENV !== 'production') app.listen(process.env.PORT || 3001);
