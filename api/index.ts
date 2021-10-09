import express from 'express';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const Cloudant = require('@cloudant/cloudant');
const cloudant = new Cloudant({ url: process.env.CLOUDANT_URL, plugins: { iamauth: { iamApiKey: process.env.CLOUDANT_API_KEY } } });

const db = cloudant.use('wtp');

const app = express();
app.use(express.json());

app.get('/api/unit-data', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json(await db.get('unit_data'));
});

module.exports = app;

if (process.env.NODE_ENV !== 'production') app.listen(process.env.PORT || 3001);
