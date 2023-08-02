
const review= require('../models/review.model.js')




module.exports.getReview = async (req, res) => {
    
    try {
        const reviewcollection = await review.find();
    return res.status(200).send(reviewcollection.reverse())
    } catch (error) {
       return res.status(500).json(error.message); 
    }
}

module.exports.addReview = async (req, res) => {
    
    try {
        const newReview = req.body;
        const reviewCollection = await review.create(newReview);
        return res.send({ reviewCollection });
    } catch (error) {
       return res.status(500).json(error.message); 
    }
}
