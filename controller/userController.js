const Users = require('../model/userModel')
const utils = require('../util/utils')




// Registering a user

exports.register = async(req,res)=>{
    //1. geting details from the user in the body
    const body = req.body
    const user = { firstName,lastName,email,password,address,phoneNumber } = body

    //checking th email exist

    if((await utils.emailExist(email))){
    res.status(406).json({
        status: 'Not Acceptable',
        message:'Email already Exist'
    })

    }

    else{
        //checking if phone number exist
        if(await utils.phoneNumberExist(phoneNumber)){
            res.status(406).json({
                status:'Not Acceptable',
                message:'Phone number already exist'
            })
        
            }
            else{
                //encrypt the password
        user.password = await utils.encryptPassword(password)
    
        // The save to the Database
        const userRegistered = await Users.create({...user })

        res.status(202).json({
            status:'Success!',
            message:'User successfully registered',
            data:userRegistered
        })
            }
    }
    
}


// LOGIN FOR USERS

exports.UsersLogin = async (req, res) => {
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
                const token = await utils.genToken(userFound._id,process.env.JWT_SECRET_STORE)
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



