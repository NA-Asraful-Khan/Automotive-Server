const { getTool,getSingleTool,addTool,deleteTool } = require('../controllers/tool.controller')

const router = require('express').Router()


router.get('/', getTool)
router.get('/:id', getSingleTool)
router.post('/', addTool)
router.delete('/:id', deleteTool)

module.exports = router