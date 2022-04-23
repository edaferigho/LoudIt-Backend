const Users = require('../model/userModel')
const bycrypt = require('bcrypt')
const Store = require('../model/storeModel')
const jwt = require('jsonwebtoken')

// FOR USERS
// checking if email is existing 
exports.emailExist = async()=>{
    const findEmail = await Users.findOne({ email })
    if(findEmail){
        return true
    }
    else return false;
}

// checking if username exits
exports.phoneNumberExist = async()=>{
    const phoneNumberFound = await Users.findOne({ phoneNumber })
    if (phoneNumberFound) {
        return true
    }
    else return false
}
// encrypting the User Password

exports.encryptPassword = async(password)=>{
    return passwordHashed = await bycrypt.hash(password,12)
}

//Password verification 
exports.verifyPassword = async(password,passwordHashed)=>{
    return await bycrypt.compare(password, passwordHashed)
}

exports.genToken = async (_id) => {
    return await jwt.sign({ _id }, process.env.SECRET, { expiresIn: process.env.Jwt_Expires_In })

}

// FOR STORES
exports.existingEmail = async () => {
    const foundEmail = await Store.findOne({ email })
    if (foundEmail) {
        return true
    }
    else return false
}

exports.existingContact = async () => {
    const foundContact = await Store.findOne({ phoneNumber })
    if (foundContact) {
        return true
    }
    else return false
}

exports.StoreName = async()=>{
    const storeNameFound = await Store.findOne({fullName })
    if(storeNameFound){
        return true
    }
    else return false
}
 


