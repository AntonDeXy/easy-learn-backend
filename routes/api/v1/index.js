const router = require('express').Router()
// const jwtCheck = require('../../../middleware/jwtCheck')

router.use('/lists', require('./lists'))
router.use('/items', require('./items'))
router.use('/notes', require('./notes'))
router.use('/users', require('./users'))
// router.use('/user', jwtCheck, require('./user'))

module.exports = router