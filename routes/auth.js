const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const usersControllers = require('../controllers/users')
// JWT sercret
const { jwtSecret } = require('../utils/config')

const router = express.Router()

router.put('/changeUserInfo/:id', 
// passport.authenticate('jwt', { session: false }),
usersControllers.changeInfo)

router.post('/signup', (req, res) => {
  passport.authenticate('local-signup', { session: false }, (err, user, message) => {
    if (err || !user) { 
      return res.status(400).json(message)
    }

    res.json({ message, user })
  }) (req, res)
})

router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, message) => {
    if (err || !user) {
      console.log(err)
      console.log(user)
      return res.status(400).json({ message })
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

module.exports = router