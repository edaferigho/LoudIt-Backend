const express = require('express');

const productController = require('../controller/productController')
const router = express.Router();


router.get('/search', productController.searchByName)
router.get('/:productId', productController.getProduct)
router.get('/:storeId', productController.getProductsByStore)
router.get('/category', productController.getProductsByCategory)
router.get('/', productController.getAllProducts)

router.post('/', productController.addProduct)
router.delete('/:productId', productController.removeProducts)
router.put('/:productId',productController.updateProduct)
router.put('/updateInventory/:productId',productController.updateInventory)
module.exports = router;