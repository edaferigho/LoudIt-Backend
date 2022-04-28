const jwt = require('jsonwebtoken')
const Store = require('../model/storeModel')
const User = require('../model/userModel')
async function auth (req, res, next){
    const sender = req.headers.sender;
    const token = req.headers.authorization
    console.log(sender)

    if (sender === "USER") {
        //USE THE USER AUTH
        try {
            const authUser = jwt.verify(token, process.env.JWT_SECRET_USER);
            const authUserId = authUser.userId
            req.user = await User.findById(authUserId);
              

            next()
        } catch (error) {
            console.log(error)
            res.status(500).json({
                "status": "failed!",
                "message": "Invalid token!"
            })
        
        }
       
    }
    else if (sender === "STORE") {
        // USE THE STORE AUTH
        try {
            const authUserId = jwt.verify(token, process.env.JWT_SECRET_STORE);
            // const authUserId = authUser.userId
            req.store = await Store.findById(authUserId);
            req.sender = "STORE"

            next()
        } catch (error) {
            console.log(error)
            res.status(500).json({
                "status": "failed!",
                "message": "Invalid token!"
            })
        
        }
    }
    else {
        res.status(400).json({
            "message":"Unkown request sender"
        })
    }
}

module.exports = auth