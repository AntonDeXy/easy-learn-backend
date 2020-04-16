const router = require('express').Router()
const listsControllers = require('../../../controllers/list')
const usersControllers = require('../../../controllers/users')

router.get('/by-author-id/:authorId/', listsControllers.categoriesByAuthor)

router.get('/by-list-id/:listId/', listsControllers.categoryById)

router.post('/new/', listsControllers.create)

router.put('/edit/:listId/', listsControllers.edit)

router.delete('/remove/:listId/', listsControllers.remove)

router.post('/add-to-profile/', usersControllers.addNewListToProfile)

router.post('/remove-from-profile/', usersControllers.removeObjectFromProfile)

module.exports = router

