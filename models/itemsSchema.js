const mongoose = require('mongoose')

const itemsSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  word: String,
  translate: String,
  audioUrl: String,
}, {collection: 'items'})

module.exports = mongoose.model('Item', itemsSchema)