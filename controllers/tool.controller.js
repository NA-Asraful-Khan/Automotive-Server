const toolCollection= require('../models/tool.model')


module.exports.getTool = async (req, res) => {
    
    try {
        const tool = await toolCollection.find();
    return res.status(200).send(tool.reverse())
    } catch (error) {
       return res.status(500).json(error.message); 
    }
}

module.exports.getSingleTool = async (req, res) => {
    try {
        const id = req.params.id;
        const tool = await toolCollection.findById({_id:id});
        return res.status(200).send(tool)
    } catch (error) {
       return res.status(500).json(error.message); 
    }
}


module.exports.addTool = async (req, res) => {
    
    try {
        const newTool = req.body;
        const tool = await toolCollection.create(newTool);
        return res.send({ tool });
    } catch (error) {
       return res.status(500).json(error.message); 
    }
}


module.exports.deleteTool = async(req,res)=>{
    try {
        const toolSave = await toolCollection.findByIdAndDelete(req.params.id)
        return res.status(200).json(toolSave)
    } catch (error) {
       return res.status(500).json(error.message); 
    }
}