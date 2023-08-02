const { getTool,getSingleTool,addTool } = require('../controllers/tool.controller')

const router = require('express').Router()


router.get('/', getTool)
router.get('/:id', getSingleTool)
router.post('/', addTool)

module.exports = router