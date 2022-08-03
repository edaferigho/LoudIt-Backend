
const mongoose = require('mongoose')

const storeSchema = mongoose.Schema({
    storeName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    bankDetails:{
        type:String,
        required:false
    },
    profilePicture:{
        type:String,
        required:false
    },
    websites:{
        type:String,
        required:false
    },
    directions:{
        type:String,
        required:false
    },
    enscrowAmount: {
        type: Number,
        required: false,
        default:0.0
    },
    newOrders: {
        type: Number,
        required: false,
        default: 0
    },
    totalOrders: {
        type: Number,
        required: false,
        default: 0
    },
    successfulOrders: {
        type: Number,
        required: false,
        default: 0
    },
    isActive:{
        type:Boolean,
        default:false,
        required:true
    },
    dateCreated:{
        type:Date,
        default:Date.now()
    },
})

//Creating the supermarket model

const store = mongoose.model('Store',storeSchema)

module.exports = store



