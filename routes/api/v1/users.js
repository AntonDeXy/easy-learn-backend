const router = require('express').Router()
const usersControllers = require('../../../controllers/users')

router.get('/get-profile/:userId', usersControllers.getProfile)

router.put('/remove-list/:userId', usersControllers.removeObjectFromProfile)

router.put('/add-list/:userId', usersControllers.addNewListToProfile)

router.post('/new/', usersControllers.createProfile)

module.exports = router

