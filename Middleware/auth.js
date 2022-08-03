const jwt = require('jsonwebtoken')
const Store = require('../model/storeModel')
const User = require('../model/userModel')
exports.auth =async (req, res, next)=>{
    const sender = req.headers.sender;
    
    console.log(sender)
    if (req.headers.authorization) {
        const token = req.headers.authorization
    if (sender === "USER") {
        //USE THE USER AUTH
        try {
            const authUser =  jwt.verify(token, process.env.JWT_SECRET_USER);
            const authUserId = authUser._id
            
            const user = await User.findById(authUserId);
            req.user = user;
            
            next()
        } catch (error) {
            console.log(error)
            res.status(500).json({
                "status": "failed!",
                "message": "Unauthorized! Token failed"
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
                "message": "Unauthorized! Token failed!"
            })
        
        }
    }
    else {
        res.status(400).json({
            "message":"Unauthorized! Invalid Sender"
        })
    }
    } else {
        res.status(400).json({
            "message": "Unauthorized! No Token available"
        })
 }
}
exports.adminAuth =async (req, res, next) => { 

    if (req.user && req.user.isAdmin) {
        next()
    }
    else {
        res.status(401).json({
            "message":"Not authorized as admin"
        })
    }
}
exports.sellerAuth = async(req, res, next) => {
    if (req.store && req.sender === 'STORE') {
        next()
    }
      else {
        res.status(401).json({
            "message":"Not authorized as seller"
        })
    }
}



