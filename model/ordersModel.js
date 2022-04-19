const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    product:{
        type:String,
        required:true
    },
    Qty:{
        type:String,
        required:true
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
})

//creating a model for orders

const orders = mongoose.model('Orders', orderSchema)

module.exports = orders