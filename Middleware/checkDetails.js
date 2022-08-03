
exports.checkDetails = (req,res,next)=>{
    const body = req.body
    console.log(body)
    if(!body.firstName||!body.lastName||!body.email||!body.password||!body.address||!body.phoneNumber){
        res.status(400).json({
            status:'Bad Request',
            message:'Please enter required details'
        })
    }
    next()
}


//Store details check

exports.storeCheckDetails = (req,res,next)=>{
    const body = req.body
    console.log(body);
    if(!body.storeName||!body.email||!body.password||!body.address||!body.phoneNumber){
        res.status(400).json({
            status:'Bad Request',
            message:'Please enter required details'
        })
    }
    
    next()
}
