const express = require('express')
const listsControllers = require('../controllers/list')
const itemsControllers = require('../controllers/item')
const usersControllers = require('../controllers/users')
const notesControllers = require('../controllers/note')
const jwt = require('jsonwebtoken')

const router = express.Router()

// router.get('/lists/', listsControllers.getAll)

router.get('/lists/by-author-id/:authorId/', listsControllers.categoriesByAuthor)

router.get('/lists/by-list-id/:listId/', listsControllers.categoryById)

router.post('/lists/new/', listsControllers.create)

router.put('/lists/edit/:listId/', listsControllers.edit)

router.delete('/lists/remove/:listId/', listsControllers.remove)

router.post('/lists/add-to-profile/', usersControllers.addNewListToProfile)

router.post('/lists/remove-from-profile/', usersControllers.removeObjectFromProfile)

// items

router.post('/items/new/', itemsControllers.create)

router.put('/items/edit/:itemId/', itemsControllers.edit)

router.delete('/items/remove/:itemId/', itemsControllers.remove)

router.post('/items/remove-many/', itemsControllers.removeMany)

// notes

router.get('/notes/:authorId/', notesControllers.notesByAuthor)

router.post('/notes/new/', notesControllers.create)

router.put('/notes/:noteId/', notesControllers.edit)

router.delete('/notes/remove/:noteId/', notesControllers.remove)

// users

router.get('/users/get-profile/:userId', usersControllers.getProfile)

router.put('/users/remove-list/:userId', usersControllers.removeObjectFromProfile)

router.put('/users/add-list/:userId', usersControllers.addNewListToProfile)

router.post('/users/new/', usersControllers.createProfile)

module.exports = router
