const updateCollection= require('../models/update.model')




module.exports.getUpdate = async (req, res) => {
    
    try {
        const update = await updateCollection.find();
    return res.status(200).send(update.reverse())
    } catch (error) {
       return res.status(500).json(error.message); 
    }
}


module.exports.getUpdatebyEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await updateCollection.findOne({email:email});
        return res.status(200).send(user)
    } catch (error) {
       return res.status(500).json(error.message); 
    }
}

module.exports.updateUpdatebyEmail= async (req, res) => {
    try {
        const email = req.params.email;
        const user = req.body;
        const updateDoc = {
                name: user.name,
                email: user.email,
                address: user.address,
                education: user.education,
                linkedin: user.linkedin,
                mobile: user.mobile
        };
      const updateUser = await updateCollection.findOneAndUpdate(
        { email },
        updateDoc,
        { new: true } // To get the updated document as a result
      );

      if (!updateUser) {
        return res.status(404).json({ error: 'User not found.' });
      }
      return res.status(200).send(updateUser)
    } catch (error) {
        return res.status(500).json(error.message); 
    }
  };