const mongoose = require('mongoose')

const listSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  name: String,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  authorId: String
  // authorId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {collection: 'categoties'})

module.exports = mongoose.model('List', listSchema)