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
        type:Number,
        required:true
    },
    storeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: false
    },
    image_Url:{
        type:Array,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    discountPeriod:{
        type:Number,
        required:false
    },
    discountPrice:{
        type:Number,
        required:false
    },
    isDiscounted :{
        type:Boolean,
        default:false,
        required:false
    },
    discountPercentage:{
        type:Number,
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