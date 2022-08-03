
const Product = require('../model/productModel')


// @desc get all products
// @route GET api/v1/products
// @access Public
exports.getAllProducts = async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $option: 'i',
        }
    } : {};


    try {
        const count = await Product.countDocuments({ ...keyword })
        const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
        if (products.length < 1) {
            res.json('No products found!')
        }
        else {
            res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) })
        }
    }
    catch (e) {
        console.error(e)
    }
}
// @desc Get a single product by Id
// @route GET api/v1/products/:productId
// @access Public
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
                'message': 'product not found'
            })
        }

    }
    catch (error) {
        console.log(error)
    }
}
//@desc get all products for a particular store
//@route api/v1/products
//@access public
exports.getProductsByStore = async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const storeId = req.params.storeId

    try {
        const count = await Product.countDocuments({ storeId })
        const products = await Product.find({ storeId }).limit(pageSize).skip(pageSize * (page - 1))
        if (products.length < 1) {
            res.json('No products found for this Store!')
        }
        else {
            res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) })
        }
    }
    catch (e) {
        console.error(e)
    }
}
//get product by category
exports.getProductsByCategory = async (req, res) => {
    const category = req.body.category
    console.log(category);
    const products = await Product.find({ category })
    try {
        if (products.length > 0) {
            res.status(200).json({
                'message': 'success',
                products
            })
        }
        else {
            res.status(404).json({
                'message': `No product found for this category`
            })
        }
    } catch (error) {
        console.log(error)
    }
}

// @ desc Add product
// @ route POST api/v1/product
// @ access Private:Sellers
exports.addProduct = async (req, res) => {
    let product = { productName, description, price, qty, image_Url, category } = req.body
    console.log(product)
    const storeId = req.store._id
    const qtyNum = Number.parseInt(qty)
    const priceNum = Number.parseFloat(price)
    const category = category.toLowerCase()

    try {
        const createdProduct = await Product.create({ ...product, qty: qtyNum, price: priceNum, storeId, category })
        if (createdProduct) {
            res.status(201).json({
                'message': 'product created',
                'product': createdProduct
            })
        }
    } catch (error) {
        console.error(error)
    }


}
// @ desc Remove product
// @ route DELETE api/v1/products/:productId
// @ access Private:Sellers
exports.removeProducts = async (req, res) => {
    const storeId = req.store._id.toString()
    console.log(storeId);
    const productId = req.params.productId

    try {
        const product = await Product.findOneAndDelete({ _id: productId, storeId })
        if (product) {
            res.status(200).json({
                'message': 'product deleted successfully'
            })
        }
        else {
            res.status(404).json({
                'message': 'product not found'
            })
        }
    } catch (error) {

    }
}
// @ desc Update product
// @ route PUT api/v1/products/:productId
// @ access Private:Sellers
exports.updateProduct = async (req, res) => {
    const productId = req.params
    const storeId = req.store._id
    const product = { productName, description, price, qty, category, image_Url } = req.body
    try {
        product = await Product.findOneAndUpdate({ _Id: productId, storeId }, ...product, { new: true })
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

// @ desc Create Review
// @ route POST api/v1/products/:productId/reviews
// @ access Private:Users

exports.createReview = async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.productId)
    console.log(req.user);
    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        )

        if (alreadyReviewed) {
            res.status(400).json('Product already reviewed')
        }

        const review = {
            name: req.user.email,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length

        await product.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
}
// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
exports.getTopProducts = async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)

    res.json(products)
}



//Update Product Inventory
exports.updateInventory = async (req, res) => {
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
            else if (qty < noOfItems && qty > 0) {
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
                'message': 'product not found'
            })
        }

    }
    catch (e) {
        console.error(e)
    }
}


