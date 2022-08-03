const Users = require('../model/userModel')
const utils = require('../util/utils')
const jwt = require('jsonwebtoken')




// @ desc Get all users
// @ route POST /api/v1/users
// @ access Public

exports.register = async (req, res) => {
    //1. geting details from the user in the body
    const body = req.body
    const user = { firstName, lastName, email, password, address, phoneNumber } = body

    //checking th email exist

    if ((await utils.emailExist(email))) {
        res.status(406).json({
            status: 'Not Acceptable',
            message: 'Email already Exist'
        })

    }

    else {
        //checking if phone number exist
        if (await utils.phoneNumberExist(phoneNumber)) {
            res.status(406).json({
                status: 'Not Acceptable',
                message: 'Phone number already exist'
            })

        }
        else {
            //encrypt the password
            user.password = await utils.encryptPassword(password)

            // The save to the Database
            const userRegistered = await Users.create({ ...user })
            const token = await utils.genToken(userRegistered._id, process.env.JWT_SECRET_USER)
            // Sending verification email
            const verificationSent = await utils.sendVerificationEmail(email, token)
            if (verificationSent) {
                res.status(202).json({
                    status: 'Success!',
                    message: 'Account Created, A verification email has been sent to the provided email address. Plese click on the link to activate your Account',
                    data: userRegistered
                })
            }

        }
    }

}


// @ desc Login user
// @ route POST /api/v1/users/login
// @ access Public

exports.login = async (req, res) => {
    //1. Get email and password from user
    const { email, password } = req.body
    let userFound
    if (email && password) {
        try {
            userFound = await Users.findOne({ email })
        } catch (error) {
            console.log(error)
        }
    }

    else {
        res.status(400).json({
            status: 'Failed',
            message: 'Bad Request'
        })
    }
    //2. find user by email,if user exist,verify password,if password is correct

    if (userFound) {
        try {
            const hashedPassword = userFound.password
            if (await utils.verifyPassword(password, hashedPassword)) {
                //3. then generate token for user
                const token = await utils.genToken(userFound._id, process.env.JWT_SECRET_USER)
                res.status(200).json({
                    user: userFound,
                    token,
                    message: 'Login Successful'
                })
            }
            else {
                res.status(400).json({
                    message: 'Incorrect Password'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    else {
        res.status(404).json({
            message: "User don't exist,please enter correct details"
        })
    }
}


// @ desc Get all users
// @ route /api/v1/users
// @ access Private/Admin

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Users.find({})
        if (users) {
            res.status(200).json(users)
        }
        else {
            res.status(404)
            throw new Error('No user found!')
        }

    } catch (error) {
        console.error(error)
    }

}

// @ desc Get user profile
// @ route /api/v1/users/profile
// @ access Private

exports.getUserProfile = async (req, res) => {
    try {
        const user = Users.findById(req.user._id).select('-password')
        if (user) {
            res.json({
                'id': user._id,
                ...user
            })
        }
        else {
            res.status(404)
            throw new Error('User not found')
        }
    } catch (error) {
        console.error(error)
    }
}

// @ desc Get user by id
// @ route GET /api/v1/users/:userId
// @ access Private/Admin
exports.getUser = async (req, res) => {
    try {
        const user = await Users.findById(req.params.userId).select('-password');
        if (user) {
            res.status(200).json(user)
        }
        else {
            throw new Error('user not found')
        }
    } catch (error) {
        console.error(error)
    }
}
//@ desc Update User
// route PUT /api/v1/users/:userId
// @ access Private
exports.updateUser = async (req, res) => {
    try {
        const user = await Users.findByIdAndUpdate(req.params.userId, { new: true }).select('-password');
        if (user) {
            res.status(200).json(user)
        }
        else {
            throw new Error('user not found')
        }
    }
    catch (e) {
        console.error(e)
    }
}

//@ desc Delete User
// route DELETE /api/v1/users/:userId
// @ access Private/Admin
exports.deleteUser = async (req, res) => {
    try {
        const user = await Users.findByIdAndDelete(req.params.userId);
        if (user) {
            res.status(200).json({ 'message': 'User deleted successfully' })
        }
        else {
            throw new Error('user not found')
        }
    }
    catch (e) {
        console.error(e)
    }
}

//@ desc Activate Users
// route  {CLIENT_URL}/api/v1/activate/users/:token
// @ access Public
exports.activate = async (req, res) => {
    try {
        const token = req.params.token;
        if (token) {
            const userId = jwt.verify(token, process.env.JWT_SECRET_USER)
            if (userId) {
                const user = await Users.findById(userId)
                user.isActive = true
                res.status(200).json({ 'message': 'User activated successfully' })
            } else {
                res.status(400).json({ 'message': 'Invalid link, please try again' })
            }
        }
    } catch (error) {
        console.error(error)
    }
}