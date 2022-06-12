const express = require('express');
require('dotenv').config();
const userRoute = require('./route/userRoute');
const storeRoute = require('./route/storeRoute');
const productRouter = require('./route/productRoute')
const db = require('./util/dbConfig');
const app = express();

db();
// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//Routes
app.use('/api/v1/products',productRouter)
app.use('/api/v1/users',userRoute)
app.use('/api/v1/stores', storeRoute)



app.get('/', (req, res) => {
    res.json('LoudIt version 1.0 is currently live! and the docs are currently in progress')
});


app.all('*',(req, res)=> {
    res.json('Invalid Route')
})




const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is up and running at 127.0.0.1:${PORT}`)
})