const express =require ('express')
const middleware = require('../Middleware/checkDetails')
const storeController = require('../controller/storeController')



const Router = express.Router()




Router.post('/signup',middleware.storeCheckDetails,storeController.storeRegistration)
Router.post('/login',storeController.StoreLogin)

module.exports = Router