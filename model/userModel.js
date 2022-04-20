const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    address:{
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
    phoneNumber:{
        type:String,
        required:true
    },
    profile_picture:{
        type:String,
        required:false
    },
    isActive:{
        type:Boolean,
        default:false,
        required:false
    },
    dateCreated:{
        type:Date,
        default:Date.now()
    }
})
//creatung a user model

const users = mongoose.model('Users',userSchema)

module.exports = users