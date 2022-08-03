const express = require('express');

const productController = require('../controller/productController')
const authMiddleware = require('../Middleware/auth')
const router = express.Router();


// Unprotedcted Routes
router.put('/updateInventory/:productId', productController.updateInventory)
router.get('/category', productController.getProductsByCategory)
router.get('/tops', productController.getTopProducts)
router.get('/:productId', productController.getProduct)
router.get('/store/:storeId', productController.getProductsByStore)
router.get('/', productController.getAllProducts)
// Protected Routes
router.post('/:productId/review', authMiddleware.auth, productController.createReview)
router.post('/', authMiddleware.auth,authMiddleware.sellerAuth,productController.addProduct)
router.delete('/:productId',authMiddleware.auth,authMiddleware.sellerAuth, productController.removeProducts)
router.put('/:productId',authMiddleware.auth,authMiddleware.sellerAuth,productController.updateProduct)

module.exports = router;