const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:false
    },
    lastName: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
   
    create_date: {
        type: Date,
        default:Date.now()
    }
})
// creating model for the admin
const admin = mongoose.model('Admin', adminSchema)

module.exports = admin