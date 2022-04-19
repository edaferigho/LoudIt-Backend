const express = require('express');
require('dotenv').config();

const db = require('./util/dbConfig');

const app = express();
db();

app.get('/', (req, res) => {
    res.json('This is the home page')
});


const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is up and running at 127.0.0.1:${PORT}`)
})