const router = require('express').Router()
const itemsControllers = require('../../../controllers/item')

router.post('/new/', itemsControllers.create)

router.put('/edit/:itemId/', itemsControllers.edit)

router.delete('/remove/:itemId/', itemsControllers.remove)

router.post('/remove-many/', itemsControllers.removeMany)

module.exports = router

