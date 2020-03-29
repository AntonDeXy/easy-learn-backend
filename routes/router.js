const express = require('express')
const categoriesControllers = require('../controllers/category')
const itemsControllers = require('../controllers/item')
const usersControllers = require('../controllers/users')
const notesControllers = require('../controllers/note')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.get('/categories/', categoriesControllers.getAll)

router.get('/categories/:authorId', categoriesControllers.categoriesByAuthor)

router.post('/categories', categoriesControllers.create)

router.put('/categories/:id', categoriesControllers.edit)

router.delete('/categories/:id', categoriesControllers.remove)

router.post('/addCategoryToProfile', usersControllers.addNewListToProfile)

router.post('/removeObjectFromProfile', usersControllers.removeObjectFromProfile)

// items

router.post('/items', itemsControllers.create)

router.put('/items/:id', itemsControllers.edit)

router.delete('/items/:id', itemsControllers.remove)

router.post('/itemsRemoveMany', itemsControllers.removeMany)

// notes

router.get('/notes/:authorId', notesControllers.notesByAuthor)

router.post('/notes', notesControllers.create)

router.put('/notes/:id', notesControllers.edit)

router.delete('/notes/:id', notesControllers.remove)

// users

router.get('/users/:userId', usersControllers.getProfile)

router.put('/users/:userId', usersControllers.removeObjectFromProfile)

router.put('/users/:userId', usersControllers.addNewListToProfile)

router.post('/users', usersControllers.createProfile)

module.exports = router
