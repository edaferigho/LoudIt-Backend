const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            qty: {
                type: Number,
                default: 1,
                required: true
            }
        }
    ],
    cartTotal:{
        type:Number,
        required: true,
        default:0
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
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

//creating a model for cart

const cart= mongoose.model('Cart', cartSchema)

module.exports = cart