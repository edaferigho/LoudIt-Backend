const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    rating:{
        type:Number,
        required:true
    },
    comment: {
        type: String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required:true
    }
    

},
    {
        timeStamps:true
    },
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },

}

)

// // creating a Review Model

// const review = mongoose.model('Review',reviewSchema)

module.exports = reviewSchema