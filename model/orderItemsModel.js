const mongoose = require('mongoose')

const orderItemSchema = mongoose.Schema({
    product:{
        type:String,
        required:true
    },
    Qty:{
        type:Number,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    order_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders',
        required: true
    },
    dateCreated:{
        type:Date,
        default:Date.now()
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },

}

)

//creating a model for orderItems

const orderItems= mongoose.model('OrderItems', orderItemsSchema)

module.exports = orderItems