const express = require('express');
require('dotenv').config();
const userRoute = require('./route/userRoute');
const storeRoute = require('./route/storeRoute');
const db = require('./util/dbConfig');
const app = express();

db();
// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//Routes
app.use('/products',productRouter)
app.use('/api/users',userRoute)
app.use('/api/stores', storeRoute)



app.get('/', (req, res) => {
    res.json('This is the home page')
});


app.all('*',(req, res)=> {
    res.json('Invalid Route')
})




const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is up and running at 127.0.0.1:${PORT}`)
})