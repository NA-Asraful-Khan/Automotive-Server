const mongoose= require ('mongoose')

const ReviewSchema = new mongoose.Schema({
    email:{
        type:String
    },
    name:{
        type:String
    },
    review:{
        type:String
    },
    ratings:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{ collection: 'Review' })

const review = mongoose.model('Review', ReviewSchema);

module.exports= review;