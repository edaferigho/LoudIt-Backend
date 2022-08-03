const express = require('express')
const cartController = require('../controller/cartController')
const productController = require('../controller/productController')
const authMiddleware = require('../Middleware/auth')

const router = express.Router()


router.post('/:productId/add', authMiddleware.auth, cartController.addToCart)
router.post('/:productId/remove', authMiddleware.auth, cartController.removeFromCart)
router.delete('/', authMiddleware.auth, cartController.deleteUserCart)
router.get('/', authMiddleware.auth, cartController.getUserCart)

module.exports = router;