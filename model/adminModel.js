const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin_Id:{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Admin',
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