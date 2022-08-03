const Cart = require('../model/cartModel');
const Products = require('../model/productModel');


// @ desc Add to Cart
// @ route POST /api/v1/cart/:productId/add
// @ access private

// Todo:
// Check if user already have a cart. if yes add product to cart else create a new cart and add product to cart
//update the current amount by adding the product amount*quantity to the current amount
//Save the cart
exports.addToCart = async (req, res) => {
    try {
        const qty = Number(req.body.qty)
        const cart = await Cart.findOne({ user_id: req.user._id }) || new Cart();
        const product = await Products.findById(req.params.productId)
        if (product) {
            if (product.qty >= req.body.qty) {
                // Check if the product is already in the cart
                const foundProduct = cart.products.find(p => {

                    return p.productId.toString() === product._id.toString()
                })

                // Get the product Index
                const productIndex = cart.products.indexOf(foundProduct)

                // Update the qty of the product
                if (productIndex > -1) {
                    cart.products[productIndex].qty += Number(req.body.qty)
                    cart.cartTotal = cart.cartTotal + product.price * Number(req.body.qty)
                }
                else {
                    const cartProduct = { productId: product._id, qty: Number(req.body.qty), price: product.price }
                    cart.cartTotal = cart.cartTotal + product.price * Number(req.body.qty)
                    cart.user_id = req.user._id
                    cart.products.push(cartProduct)
                }

                cart.save();
                res.status(200).json(cart);
            }
            else {
                res.status(200).json({ "message": `Insufficient Quantity! Only ${product.qty} remaining!` });
            }
        }
        else {
            res.status(400).json({ 'message': 'Product not found' })
        }
    } catch (error) {
        console.error(error)
    }

}


// @ desc Remove product from Cart
// @ route POST /api/v1/cart/:productId/remove
// @ access private
exports.removeFromCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user_id: req.user._id })

        const foundProduct = cart.products.find(p => {
            return req.params.productId === p.productId.toString()
        })
        const productIndex = cart.products.indexOf(foundProduct)
        if (productIndex > -1)//If found, remove
        {
            const newProducts = cart.products.filter((p) => {
                return p.productId.toString() !== req.params.productId
            })
            console.log(newProducts)

            if (newProducts.length > 0) {
                cart.cartTotal = cart.cartTotal - (cart.products[productIndex].qty) * cart.products[productIndex].price
                cart.products = newProducts
                cart.save()
                res.status(200).json(cart)
            }
            else {
                // if there are no products then delete the cart

                Cart.findByIdAndDelete(cart._id)
                res.status(200).json({ 'message': 'Cart deleted successfully!' })
            }
        }
        else {
            res.status(404).json({ 'message': 'product not found in Cart' })
        }


    } catch (error) {
        console.log(error)
    }
}
// @ desc Get user cart
// @ route POST /api/v1/cart
// @ access private
exports.getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user_id: req.user._id })
        if (cart) {
            res.status(200).json(cart)
        }
        else {
            res.status(404).json('Cart not found')
        }
    } catch (error) {
        console.error(error)
    }
}

// @ desc Delete user cart
// @ route DELETE /api/v1/cart
// @ access private

exports.deleteUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ user_id: req.user._id })
        if (cart) {
            res.status(200).json({ 'message': 'Cart deleted successfully' })
        }
        else {
            throw new Error('Cart not found')
        }
    } catch (error) {
        console.error(error)
    }
}