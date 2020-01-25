const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt')

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

// User model
const User = require('../models/User')

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password,done) => {
  process.nextTick(() => {
    User.findOne({ 'email': email }, (err, user) => {
      if (user) {
        return done(null, false, { message: 'This email is already registered.' })
      } else {
        const newUser = new User()
        newUser.nickname = req.body.nickname
        newUser.email = email
        newUser.password = newUser.generateHash(password)
        newUser.save((err) => {
          if (err) {
            throw err
          }

          return done(null, newUser, { message: 'Registered succesfully.' })
        })
      }
    })
  })
}))

passport.use( 'local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return done(null, user, { message: 'No account assosiated with this email found' })
    }

    if (!user.validatePassword(password)) {
      return done(null, false, { message: 'Password is incorrect' })
    }

    return done(null, user, { message: 'Succesfully logged in.' })
  } catch (err) {
    return done(err)
  }
}))

passport.use('jwt', new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  // jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
  // In futre JWT require from .env 
  // expiresIn: '1d',
  secretOrKey: '9f34ur783f39'
}, (jwtPayload, done) => {
  return User.findOne({_id: jwtPayload._id})
    .then(user => {
      return done(null, user)
    })
    .catch(err => {
      return done(err)
    })
}))

module.exports = passport