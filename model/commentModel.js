const mongoose = require('mongoose')

const commentModel = mongoose.Schema({
    reviewId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review',
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    commentDate:{
        type:Date,
        default:Date.now()

    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },

}

)

// creating a comment model
const comment = mongoose.Schema('Comment',commentModel)

module.exports = comment