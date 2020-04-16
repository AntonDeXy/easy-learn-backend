const router = require('express').Router()
const itemsControllers = require('../../../controllers/item')

router.post('/items/new/', itemsControllers.create)

router.put('/items/edit/:itemId/', itemsControllers.edit)

router.delete('/items/remove/:itemId/', itemsControllers.remove)

router.post('/items/remove-many/', itemsControllers.removeMany)

module.exports = router

