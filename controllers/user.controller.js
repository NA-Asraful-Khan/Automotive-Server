const userCollection= require('../models/user.model')

module.exports.getUser = async (req, res) => {
    try {
        const user = await userCollection.find();
        return res.status(200).send(user.reverse())
    } catch (error) {
       return res.status(500).json(error.message); 
    }
}

module.exports.getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await userCollection.findOne({email:email});
        return res.status(200).send(user)
    } catch (error) {
       return res.status(500).json(error.message); 
    }
}


module.exports.updateUserRoleByEmail= async (req, res) => {
    try {
        const email = req.params.email;

      const updateUser = await userCollection.findOneAndUpdate(
        { email },
        { role: 'Admin' },
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

  module.exports.updateUserByEmail= async (req, res) => {
    try {
        const email = req.params.email;
        const user = req.body;
      const updateUser = await userCollection.findOneAndUpdate(
        { email },
        user,
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