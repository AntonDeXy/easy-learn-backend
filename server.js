const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectId
const app = express()
const cors = require('cors')
const mongoose = require('mongoose') 
// on heroku uncomment next line
// const url = process.env.MONGODB_URI || 'mongodb://antonDexy:1gdy54ff@ds163517.mlab.com:63517/heroku_13pcnz63'
const url = 'mongodb+srv://podolyananton:1gdy54ff@cluster0-s6ujg.mongodb.net/test?retryWrites=true&w=majority'
const articleSchema = require('./models/itemsSchema')
const cookieParser = require('cookie-parser')
const listsControllers = require('./controllers/list')
let port = process.env.PORT || 5001
const router = require('./routes/index')
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
app.use(cors({ origin: 'http://localhost:3000' }));
// app.use(cors({ origin: 'http://localhost' }));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(router)

const authConfig = {
  domain: "dev-iy8j1k6d.auth0.com",
  audience: "https://dev-iy8j1k6d.auth0.com/api/v2/"
}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});

app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!"
  })
})

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).catch(err => console.log(err))

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected')
})

app.listen(port, '0.0.0.0', () => {
  console.log("API started")
})
