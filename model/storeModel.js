
const mongoose = require('mongoose')

const storeSchema = mongoose.Schema({
    fullName:{
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
        required:true
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
    dateCreated:{
        type:Date,
        default:Date.now()
    },
})

//Creating the supermarket model

const store = mongoose.model('Store',storeSchema)

module.exports = store



