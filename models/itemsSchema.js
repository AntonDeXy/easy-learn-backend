const mongoose = require('mongoose')

const itemsSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  // title: String,
  word: String,
  translate: String,
}, {collection: 'items'})

module.exports = mongoose.model('Item', itemsSchema)