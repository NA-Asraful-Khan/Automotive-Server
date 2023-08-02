const mongoose= require ('mongoose')

const ToolSchema = new mongoose.Schema({
    productName:{
        type:String
    },
    company:{
        type:String
    },
    price:{
        type:Number
    },
    availableQuantity:{
        type:Number
    },
    minimumOrder:{
        type:Number
    },
    description:{
        type:String
    },
    picture:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{ collection: 'Tool' })

const toolCollection = mongoose.model('Tool', ToolSchema);

module.exports= toolCollection;