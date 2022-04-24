const express = require('express')
const middleware = require('../Middleware/checkDetails')
const auth = require('../controller/userController')

const Router = express.Router()

Router.use(express.urlencoded({extended:true}))
Router.use(express.json())


Router.post('/register',middleware.checkDetails,auth.register)
Router.post('/login',auth.UsersLogin)




module.exports = Router