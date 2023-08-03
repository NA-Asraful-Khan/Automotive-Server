const { getUpdate,getUpdatebyEmail,updateUpdatebyEmail } = require('../controllers/update.controller')

const router = require('express').Router()


router.get('/', getUpdate)
router.get('/:email', getUpdatebyEmail)
router.put('/:email', updateUpdatebyEmail)
// router.get('/admin', getUser)
// router.get('/:email', getUserByEmail)
// router.get('/admin/:email', getUserByEmail)
// router.put('/admin/:email', updateUserRoleByEmail)
// router.put('/:email', updateUserByEmail)

module.exports = router