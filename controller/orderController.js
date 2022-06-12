
const Order = require('../model/orderModel')




//1. get all orders\
//2. Get orders for a particular store
//3. Get orders for a particular user
//4. Add orders
//5. Delete orders
//6. Get all orders according to status
exports.getOrdersByStatus = async(req, res) => {
    
    const { status } = req.body
    if (status != 'PENDING' || status != 'PROCESSING' || status != 'SHIPPED' || status != 'DELIVERED') {
        res.status(400).json({
            'message':'Wrong Order request'
        })
    }
    else {
        try {
            const orders= await Order.find({ status })
            if (orders.length > 0) {
                res.status(200).json({
                    orders
                })
            }
            res.status(200).json({
                'message':'Order list is empty'
            })
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