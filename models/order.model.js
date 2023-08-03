const mongoose= require ('mongoose')

const OrderSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    productName:{
        type:String
    },
    company:{
        type:String
    },
    availableQuantity:{
        type:Number
    },
    minimumOrder:{
        type:Number
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    },
    mobile:{
        type:String
    },
    address:{
        type:String
    },
    totalAmount:{
        type:Number
    },
    picture:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{ collection: 'Order' })

const orderCollection = mongoose.model('Order', OrderSchema);

module.exports= orderCollection;