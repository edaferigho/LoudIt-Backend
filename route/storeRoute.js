const express =require ('express')
const midware = require('../Middleware/checkDetails')
const auth = require('../controller/storeController')



const Router = express.Router()

Router.use(express.urlencoded({extended:true}))
Router.use(express.json())


Router.post('/signup',midware.storeCheckDetails,auth.storeRegistration)
Router.post('/login',auth.StoreLogin)

module.exports = Router