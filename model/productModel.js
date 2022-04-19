const mongoose = require('mongoose')

const productSchema  = mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    sellerID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supermarket',
        required: true
    },
    image_Url:{
        type:Array,
        required:true
    },
    Qty:{
        type:String,
        required:true
    },
    discountPrice:{
        type:String,
        required:false
    },
    discounted :{
        type:String,
        required:false
    },
    discountPercentage:{
        type:String,
        required:false
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
// Creating the model for Products

const products = mongoose.model('Products',productSchema)

module.exports = products