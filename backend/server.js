const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

const mongoUrl = 'mongodb://mongo-service:27017';

app.get('/message', async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);

    await client.connect();

    const db = client.db('demo');

    const collection = db.collection('messages');

    let msg = await collection.findOne();

    if (!msg) {
      await collection.insertOne({
        message: 'Hello from MongoDB!'
      });

      msg = await collection.findOne();
    }

    await client.close();

    res.json({
      message: msg.message
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

app.listen(3000, () => {
  console.log('Backend running on port 3000');
});
