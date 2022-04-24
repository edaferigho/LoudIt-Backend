
exports.checkDetails = (req,res,next)=>{
    const body = req.body
    if(!body.firstName||!body.lastName||!body.email||!body.password||!body.address||!body.phoneNumber){
        res.status(400).json({
            status:'Bad Request',
            message:'Please enter required details'
        })
    }
    next()
}


//Admin details check

exports.storeCheckDetails = (req,res,next)=>{
    const body = req.body
    if(!body.fullName||!body.email||!body.password||!body.address||!body.phoneNumber){
        res.status(400).json({
            status:'Bad Request',
            message:'Please enter required details'
        })
    }
    next()
}
