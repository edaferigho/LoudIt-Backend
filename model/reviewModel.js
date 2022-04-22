const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    stars:{
        type:Number,
        required:true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required:true
    },
    ownerId :{
        type:mongoose.Schema.Types.ObjectId,
        ref: '',
        required:true
    }

},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },

}

)

// creating a Review Model

const review = mongoose.model('Review',reviewSchema)

module.exports = review 