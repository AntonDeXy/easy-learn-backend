const router = require('express').Router()
const usersControllers = require('../../../controllers/users')

router.get('/get-profile/:userId', usersControllers.getProfile)

router.put('/remove-list/:userId', usersControllers.removeObjectFromProfile)

router.put('/add-list/', usersControllers.addNewListToProfile)

router.put('/add-test/', usersControllers.addNewTestToProfile)

router.post('/new/', usersControllers.createProfile)

module.exports = router

