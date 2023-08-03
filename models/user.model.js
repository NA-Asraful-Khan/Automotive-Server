const mongoose= require ('mongoose')

const UserSchema = new mongoose.Schema({
    email:{
        type:String
    },
    name:{
        type:String
    },
    role:{
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
    createdAt:{
        type:Date,
        default:Date.now
    }
},{ collection: 'User' })

const userCollection = mongoose.model('User', UserSchema);

module.exports= userCollection;