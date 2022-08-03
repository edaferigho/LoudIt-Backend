const express = require('express')
const orderController = require('../controller/orderController')
const cartController = require('../controller/cartController')
const productController = require('../controller/productController')
const authMiddleware = require('../Middleware/auth')

const router = express.Router()

router.get('/', orderController.getAllOrders)
router.get('/myorders', authMiddleware.auth, orderController.getUserOrders)
router.post('/', authMiddleware.auth, orderController.createOrder)
router.post('/:orderId', authMiddleware.auth, orderController.createOrder)

module.exports = router