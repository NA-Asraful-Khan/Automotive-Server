const { getOrder,getOrderById,createOrder,deleteOrder } = require('../controllers/order.controller')

const router = require('express').Router()


router.get('/', getOrder)
router.get('/admin', getOrder)
router.get('/:id', getOrderById)
router.post('/', createOrder)
router.delete('/:id', deleteOrder)

module.exports = router