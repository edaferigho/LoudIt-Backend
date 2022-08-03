
const Order = require('../model/orderModel')
const Cart = require('../model/cartModel')




//1. get all orders\
// @desc Get all orders
// @route GET api/v1/orders
// @access Private
exports.getAllOrders = async (req, res) => {
    const orders = await Order.find({})
    if (orders.length > 0) {
        res.status(200).json(orders)
    }
    else {
        res.status(404).json('No order found')
    }
}


// @desc Get order for a particular store
// @route GET api/v1/orders/storeorders
// @access Private
// exports.getUserOrders = async (req, res) => {
//     const orders = await Order.find({ user_id: req.user._id })
//     if (orders) {
//         res.json(orders).status(200)
//     }
//     else {
//         res.status(404)
//         throw new Error(`No order found for ${req.user._id}`)
//     }
// }


//3. Get orders for a particular user
// @desc Get order for a particular user
// @route GET api/v1/orders/myorders
// @access Private
exports.getUserOrders = async (req, res) => {
    const orders = await Order.find({ user_id: req.user._id })
    if (orders) {
        res.json(orders).status(200)
    }
    else {
        res.status(404).json(`No order found for ${req.user._id}`)
    }
}


//4. Add orders
// @desc Create Order
// @route POST api/v1/orders
// @access Private
exports.createOrder = async (req, res) => {
    const {shippingAddress} = req.body
    try {
        const cart = await Cart.findOne({ user_id: req.user._id })
        if (cart) {
            let order = await Order.create({ shippingAddress, products: cart.products, user_id: req.user._id, orderTotal:cart.cartTotal})
            console.log(order)
            Cart.findByIdAndDelete(cart._id)
            res.status(201).json(order)
        }
        else {
            res.status(404).json({"message":"cart not found"})
        }
        
    } catch (error) {
        console.error(error)
    }
}

// @ desc Get order by ID
// @ route GET api/v1/orders/:orderId
// @ access Private

exports.getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.orderId)
    if (order) {
        res.status(200).json(order)
    }
    else {
        res.status(400)
        throw new Error('Order not found')
    }
}

//5. Delete orders
//6. Get all orders according to status
exports.getOrdersByStatus = async (req, res) => {

    const { status } = req.body
    if (status != 'PENDING' || status != 'PROCESSING' || status != 'SHIPPED' || status != 'DELIVERED' || status != 'CANCELLED') {
        res.status(400).json({
            'message': 'Wrong Order request'
        })
    }
    else {
        try {
            const orders = await Order.find({ status })
            if (orders.length > 0) {
                res.status(200).json({
                    orders
                })
            }
            else {
                res.status(404);
                throw new Error('Order List is Empty');
            }

        }
        catch (e) {
            console.log(e)
        }
    }

}

























class OrderItem {
    constructor(item, qty, price) {
        this.itemId = itemId;
        this.qty = qty;
        this.price = price

    }
    get getItemId() {
        return this.itemId;
    }
    set setItem(itemId) {
        this.itemId = itemId
    }
    get getQty() {
        return this.qty;
    }
    set setQty(qty) {
        this.qty = qty
    }
    get getPrice() {
        return this.price
    }
    set setPrice(price) {
        this.price = price
    }
}