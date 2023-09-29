const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5003;
const dbConnectionStr = process.env.DB_STRING;
const dbName = 'rap';


if (!dotenv) {
  throw new Error('Could not find .env file');
}

let db;

MongoClient.connect(dbConnectionStr)
  .then(client => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Database connection error:', error);
    process.exit(1);
  });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (request, response) => {
  db.collection('rappers')
    .find()
    .sort({ likes: -1 })
    .toArray()
    .then(data => {
      response.render('template.ejs', { info: data });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    });
});
