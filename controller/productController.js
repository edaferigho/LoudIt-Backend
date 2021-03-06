const { type } = require('express/lib/response');
const Product = require('../model/productModel')


//@desc get all products
//@route /products
//@access public
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        if (products.length < 1) {
            res.json('No products found!')
        }
        else {
            res.status(200).json({products})
        }
    }
    catch(e) {
       console.error(e) 
    }
}
//@desc getprodu ct by id
//@route /products/:productId
//@access public
exports.getProduct = async (req, res) => {
    const product_id = req.params.productId;
    try {
        const product = await Product.findById(product_id)
        if (product) {
            res.status(200).json({
                'message': 'successful',
                product
            })
        }
        else {
            res.status(404).json({
                'message':'product not found'
            })
        }
        
    }
    catch (error) {
        console.log(error)
    }
}
//@desc get all products for a particular store
//@route /products
//@access public
exports.getProductsByStore = async (req, res) => {
    const storeId = req.params
    const products = await Product.find({ sellerID: storeId })
    try {
        if (products.length > 0) {
        res.status(200).json({
            'message': 'success',
            products
        })
    }
    else {
        res.status(404).json({
            'message':`No product found for user ${storeId}`
        })
    }
    } catch (error) {
        console.log(error)
    }
}
//get product by category
exports.getProductsByCategory = async (req, res) => {
    const category = req.body.category
    const products = await Product.find({category})
    try {
        if (products.length > 0) {
        res.status(200).json({
            'message': 'success',
            products
        })
    }
    else {
        res.status(404).json({
            'message':`No product found for this category`
        })
    }
    } catch (error) {
        console.log(error)
    }
}
// search product by name
// TODO: Search Product by name not yet working
exports.searchByName = async (req, res) => {
    const search = req.query.name
    try {
        const products = await Product.find({ '$or': [{ productName: { '$regex': search } }] })
        if (products > 0) {
            res.status(200).json({
                'message': 'success',
                products
            })

        }
        else {
            res.status(404).json({
                'message':`${search} not found`
            })
        }
    } catch (error) {
        
    }
}
// Add product
exports.addProduct = async (req, res) => {
    let product = { productName, description, price, qty, image_Url, category } = req.body
    console.log(product)
    const storeId = req.store._id
    const qtyNum = Number.parseInt(qty)
    const priceNum = Number.parseFloat(price)

    try {
        const createdProduct = await Product.create({ ...product, qty:qtyNum, price:priceNum,storeId })
        if (createdProduct) {
            res.status(201).json({
                'message': 'product created',
                'product': createdProduct
            })
        }
    } catch (error) {
        
    }

    
}
// Remove product
exports.removeProducts = async (req, res) => {
    const storeId = req.store._id
    const productId = req.params.productId
    
    try {
        const product = await Product.findOneAndDelete({ _id: productId, storeId })
        if (product) {
            res.status(200).json({
                'message':'product deleted successfully'
            })
        }
        else {
            res.status(404).json({
                'message':'product not found'
            })
        }
    } catch (error) {
        
    }
}
//Product Update
exports.updateProduct = async (req, res) => {
    const productId = req.params
    const storeId = req.store._id
    const product = { productName, description, price, qty, category, image_Url } = req.body
    try {
        product = await Product.findOneAndUpdate({ _Id: productId, storeId }, ...product, {new:true})
        if (product) {
            res.status(200).json({
                'message': 'product update successful',
                product
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}

//Update Product Inventory
exports.updateInventory = async(req, res) => {
    const noOfItems = Number.parseInt(req.body.noOfItems);
    const productId = req.params.productId
    let product
    try {

        product = await Product.findById(productId)
        console.log(product.qty)
        if (product) {
            let qty = product.qty
            qty = Number.parseInt(qty)
            if (product.isAvailable && qty >= noOfItems) {
                console.log(noOfItems)
            qty -= noOfItems
            
            product.qty = qty
            product.save()
            res.status(200).json({
                'message': 'product update successful',
                product
            })
            }
            else if (qty < noOfItems && qty>0) {
                res.status(200).json({
                'message': `Only ${qty} items remaining`,
                product
            })
            }
            else {
                product.isAvailable = false
                res.status(200).json({
                'message': 'Product is out of stock!',
            })
            }
            
        }
        else {
            res.status(404).json({
               'message':'product not found' 
            })
        }
    
    }
    catch (e) {
       console.error(e)
    }
    }


