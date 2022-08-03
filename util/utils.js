const nodeMailer = require('nodeMailer')
const Users = require('../model/userModel')
const bycrypt = require('bcrypt')
const Store = require('../model/storeModel')
const jwt = require('jsonwebtoken')
const Admin = require('../model/adminModel')


//Todo: Add this validator to the store and user controller
// Email  and password Validator
exports.validateEmail=(field, value)=>{
    const emailRegEx = new RegExp('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/')
    const passwordRegEx = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$')
    let response
    if (field === 'email') {
        response= emailRegEx.test(value)
    }
    else {
        response = passwordRegEx.test(value)
    }
}
//Todo: Add a password validator

// FOR USERS
// checking if email is existing 
exports.emailExist = async(email)=>{
    const findEmail = await Users.findOne({ email })
    if(findEmail){
        return true
    }
    else return false;
}

// checking if username exits
exports.phoneNumberExist = async(phoneNumber)=>{
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

exports.genToken = async (_id,secret) => {
    return await jwt.sign({ _id }, secret, { expiresIn: process.env.Jwt_Expires_In })

}

// FOR STORES
exports.existingEmail = async (email) => {
    const foundEmail = await Store.findOne({ email })
    if (foundEmail) {
        return true
    }
    else return false
}

exports.existingContact = async (phoneNumber) => {
    const foundContact = await Store.findOne({ phoneNumber })
    if (foundContact) {
        return true
    }
    else return false
}

exports.StoreName = async(fullName)=>{
    const storeNameFound = await Store.findOne({fullName })
    if(storeNameFound){
        return true
    }
    else return false
}

exports.createSuperUser = async () => {
    const admin = await Users.findOne({ email: process.env.ADMIN_EMAIL })
    if (!admin) {
        const newAdmin = await Users({
            firstName: 'Super',
            lastName: 'User',
            phoneNumber: '00-000-00001',
            address: 'System Administrator',
            email: process.env.ADMIN_EMAIL,
            password: process.env.PASSWORD,
            isAdmin: true,
            isActive:true
        })
        newAdmin.save()

    }
}
exports.sendVerificationEmail = async(email,token) => {
    var transport = nodeMailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a51a69fc9b1e80",
    pass: "344d06edc6c21d"
  }
    });
      const mail = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Account activation link",
      html: `  <h1 style="color:#fff; background-color:green; text-align:center;">User Verification</h1>
                <h1>Please click the link to activate your account</h1>
               <a href="https://${process.env.CLIENT_URL}/api/v1//users/activate/${token}">Click Here to activate</a>
            `,
    }
   
    const response = await transport.sendMail(mail)
    if (response) return true
    return false
}


