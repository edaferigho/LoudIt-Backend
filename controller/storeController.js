const Stores = require('../model/storeModel')
const Utils = require('../util/utils')

//Store sign up

exports.storeRegistration = async (req, res) => {
    //1. get details from the user
    const body = req.body
    const user = { fullName, email, password, address, phoneNumber } = body


    //2.check if email exist

    if (await Utils.existingEmail(email)) {
        res.status(406).json({
            status: 'Not Acceptable',
            message: 'Email already Exist',
            
        })


        //3.check if phoneNumber exist

    }
    else if (await Utils.existingContact(phoneNumber)) {
        res.status(406).json({
            status: 'Not Acceptable',
            message: 'Phone contact already exist',
            
        })
        
    }
    
    else {

        //4. encrypt password
        user.password = await Utils.encryptPassword(password)
        // 5. save to database
        const storeRegistered = await Stores.create({ ...user })

        res.status(200).json({
            status: 'Success',
            message:'Sign Up Successfull',
            data: storeRegistered
        })
    }

    

}

// STORE LOGIN

exports.StoreLogin = async (req, res) => {
    //1. Get email and password from user
    const { email, password } = req.body
    let userFound
    if (email && password) {
        try {
            userFound = await Stores.findOne({ email })
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
            if (await Utils.verifyPassword(password, hashedPassword)) {
                //3. then generate token for user
                const token = await Utils.genToken(userFound._id,process.env.JWT_SECRET_STORE)
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
            message: "This Store  don't exist,please enter correct details"
        })
    }
}



