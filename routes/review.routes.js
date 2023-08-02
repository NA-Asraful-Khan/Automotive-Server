const { getReview,addReview } = require('../controllers/review.controller')

const router = require('express').Router()


router.get('/', getReview)
router.post('/', addReview)

module.exports = router