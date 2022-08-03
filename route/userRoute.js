const express = require('express')
const middleware = require('../Middleware/checkDetails')
const user = require('../controller/userController')
const authMiddleware = require('../Middleware/auth')
const Router = express.Router()




Router.post('/register',middleware.checkDetails,user.register)
Router.post('/login',user.login)
Router.get('/', authMiddleware.auth, authMiddleware.adminAuth, user.getAllUsers)
Router.get('/profile', authMiddleware.auth, user.getUserProfile)
Router.get(':userId',authMiddleware.auth,authMiddleware.adminAuth, user.getUser)
Router.put('/userId',authMiddleware.auth,user.updateUser)
Router.delete('/:userId',authMiddleware.auth,authMiddleware.adminAuth, user.deleteUser)

module.exports = Router