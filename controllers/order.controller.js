const orderCollection= require('../models/order.model')

//get order with query
module.exports.getOrder = async (req, res) => {
    try {
        const {email} = req.query;
        let query = {}
        if (email) {
            query.email = email
          }
        const order = await orderCollection.find(query);
        return res.status(200).send(order.reverse())
    } catch (error) {
       return res.status(500).json(error.message); 
    }
}


module.exports.getOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await orderCollection.findById({_id:id});
        return res.status(200).send(order)
    } catch (error) {
       return res.status(500).json(error.message); 
    }
}

module.exports.createOrder = async (req, res) => {
    
    try {
        const newOrder = req.body;
        const order = await orderCollection.create(newOrder);
        return res.send({ order });
    } catch (error) {
       return res.status(500).json(error.message); 
    }
}


module.exports.deleteOrder = async(req,res)=>{
    try {
        const orderSave = await orderCollection.findByIdAndDelete(req.params.id)
        return res.status(200).json(orderSave)
    } catch (error) {
       return res.status(500).json(error.message); 
    }
}