const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  title: String,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  authorId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {collection: 'categoties'})

module.exports = mongoose.model('Category', categorySchema)