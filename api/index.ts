import express from 'express';
import dotenv from 'dotenv';

import { IUnitUpdateData } from 'wtp-shared';

// Google Auth Client
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.CLIENT_ID);

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

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Pass to next layer of middleware
  next();
});

app.get('/api/unit-data', async (req, res) => {
  if (process.env.NODE_ENV !== 'production') res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(await db.get('unit_data'));
});

app.post('/api/update-units', async (req, res) => {
  if (process.env.NODE_ENV !== 'production') res.setHeader('Access-Control-Allow-Origin', '*');

  const { data, token }: { data: IUnitUpdateData; token: any } = req.body;

  if (!token) {
    res.status(400).send('No token provided.');
    return;
  }

  let ticket;
  try {
    ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
  } catch {
    res.status(401).send('Invalid token.');
    return;
  }

  const { sub } = ticket.getPayload() || {};
  if (sub && sub !== process.env.ADMIN_SUB) {
    res.status(400).send('You are not an administrator.');
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
