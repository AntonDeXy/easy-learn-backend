require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectId
const app = express()
const cors = require('cors')
const mongoose = require('mongoose') 
const articleSchema = require('./models/itemsSchema')
const cookieParser = require('cookie-parser')
const listsControllers = require('./controllers/list')
const router = require('./routes/index')

let port = process.env.PORT || 5001
const url = process.env.MONGODB_URI

app.use(cors({ origin: [
  'http://localhost:3000',
  'https://easy-lern.herokuapp.com'
] }))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(router)

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).catch(err => console.log(err))

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected')
})

app.listen(port, '0.0.0.0', () => {
  console.log("API started")
})
