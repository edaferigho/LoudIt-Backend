const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
                required: true
            },
            qty: {
                type: Number,
                default: 1,
                required: true
            }
        }
    ],
    orderTotal:{
        type:Number,
        required:true
    },
    status: {
        type: String,
        enum:['NOT PAID','PENDING','PROCESSING','SHIPPED','DELIVERED','CANCELLED'],
        required: true,
        default:'PENDING'
    },
    isPaid: {
        type: Boolean,
        required: true,
        default:false
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    shippingAddress: {
        type: String,
        required:true
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

//creating a model for order

const order= mongoose.model('Order', orderSchema)

module.exports = order