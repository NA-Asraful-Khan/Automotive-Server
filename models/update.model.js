const mongoose= require ('mongoose')

const UpdateSchema = new mongoose.Schema({
    email:{
        type:String
    },
    address:{
        type:String
    },
    education:{
        type:String
    },
    linkedin:{
        type:String
    },
    mobile:{
        type:String
    },
    linknamedin:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{ collection: 'Update' })

const updateCollection = mongoose.model('Update', UpdateSchema);

module.exports= updateCollection;