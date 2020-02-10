const express = require('express')
const passport = require('../middleware/passport')
const categoriesControllers = require('../controllers/category')
const itemsControllers = require('../controllers/item')
const usersControllers = require('../controllers/users')
const jwt = require('jsonwebtoken')

const authRoutes = require('./auth')

const router = express.Router()

router.get('/api/me', (req, res) => {
  passport.authenticate('jwt', { session: false }, (err, user, message) => {
    if (err || !user) {
      console.log(err)
      console.log(user)
      return res.status(400).json(message)
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err)
      }
// jwt secret from .env
      const token = jwt.sign(user.toJSON(), '9f34ur783f39', {expiresIn: '1d'})
      console.log(token)
      return res.json({ token, user })
    })
  }) (req, res)
})

router.get(
  '/checktoken',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.sendStatus(200)
  }
)

// categories

// router.get('/categories', categoriesControllers.all)

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

router.use('/', authRoutes)

module.exports = router
