const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    orderItems:{
        type:Array,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    status: {
        type: String,
        enum:['PENDING','PROCESSING','SHIPPED','DELIVERED'],
        required: true,
        default:'PENDING'
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

//creating a model for order

const order= mongoose.model('Order', orderSchema)

module.exports = order