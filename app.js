const express = require('express');
require('dotenv').config();
const userRoute = require('./route/userRoute');
const storeRoute = require('./route/storeRoute');
const productRoute = require('./route/productRoute')
const cartRoute = require('./route/cartRoute')
const orderRoute = require('./route/orderRoute')
const db = require('./util/dbConfig');
const utils = require('./util/utils')
const app = express();

db();
// This creates the Super User
utils.createSuperUser()
// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//Routes
app.use('/api/v1/products',productRoute)
app.use('/api/v1/users',userRoute)
app.use('/api/v1/stores', storeRoute)
app.use('/api/v1/cart', cartRoute)
app.use('/api/v1/orders',orderRoute)



app.get('/', (req, res) => {
    res.json('<html><h1>LoudIt version 1.0 is currently live!</h1><p>You can get a progressive API Documentation at</p> <a>https://documenter.getpostman.com/view/16965892/UzkcRYB7</a></html>')
});


app.all('*',(req, res)=> {
    res.json('Invalid Route')
})




const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is up and running on ${process.env.NODE_ENV} mode at 127.0.0.1:${PORT}`)
})