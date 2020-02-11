const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectId
const app = express()
const cors = require('cors')
const mongoose = require('mongoose') 
const url = 'mongodb+srv://podolyananton:1gdy54ff@cluster0-s6ujg.mongodb.net/test?retryWrites=true&w=majority'
const articleSchema = require('./models/itemsSchema')
const cookieParser = require('cookie-parser')
const articlesControllers = require('./controllers/category')
let port = process.env.PORT || 5001
const router = require('./routes/router')

// app.use(bodyParser.json())
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(router)

// require('./auth/src/index')

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).catch(err => console.log(err))

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected')
})

// mongoose.set('useFindAndModify', false);

app.listen(port, '0.0.0.0', () => {
  console.log("API started")
})
