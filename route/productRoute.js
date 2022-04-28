const express = require('express');

const productController = require('../controller/productController')
const auth = require('../Middleware/auth')
const router = express.Router();


router.get('/search', productController.searchByName)
router.put('/updateInventory/:productId',productController.updateInventory)
router.get('/:productId', productController.getProduct)
router.get('/:storeId', productController.getProductsByStore)
router.get('/category', productController.getProductsByCategory)
router.get('/', productController.getAllProducts)

router.post('/', auth,productController.addProduct)
router.delete('/:productId',auth, productController.removeProducts)
router.put('/:productId',auth,productController.updateProduct)

module.exports = router;