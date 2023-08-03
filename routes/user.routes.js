const { getUser,getUserByEmail,updateUserRoleByEmail,updateUserByEmail } = require('../controllers/user.controller')

const router = require('express').Router()


router.get('/', getUser)
router.get('/admin', getUser)
router.get('/:email', getUserByEmail)
router.get('/admin/:email', getUserByEmail)
router.put('/admin/:email', updateUserRoleByEmail)
router.put('/:email', updateUserByEmail)

module.exports = router