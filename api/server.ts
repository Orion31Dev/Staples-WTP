import express from 'express';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

console.log(process.env.CLOUDANT_URL);

const Cloudant = require('@cloudant/cloudant');
const cloudant = new Cloudant({ url: process.env.CLOUDANT_URL, plugins: { iamauth: { iamApiKey: process.env.CLOUDANT_API_KEY } } });

const db = cloudant.use('wtp');

export const app = express();
app.use(express.json());

app.get('/unit-data', async (req, res) => {
  res.json(await db.get('unit_data'));
});

//app.listen(process.env.PORT || 3001);
