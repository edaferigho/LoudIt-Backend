const express = require('express');
require('dotenv').config();
const userRoute = require('./route/userRoute');
const storeRoute = require('./route/storeRoute');
const db = require('./util/dbConfig');
const app = express();

db();

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json('This is the home page')
});

app.use('/api/users',userRoute)
app.use('/api/stores',storeRoute)

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is up and running at 127.0.0.1:${PORT}`)
})