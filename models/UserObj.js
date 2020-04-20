const mongoose = require('mongoose')
const Schema = mongoose.Schema
const connection = mongoose.createConnection("mongodb+srv://antondexy:1gdy54ff@cluster0-comih.mongodb.net/myapi")

const UserObjSchema = new Schema(
  {
    _id: mongoose.Schema.ObjectId,
    userId: {
      type: String,
      require: true,
      unique: true
    },
    addedLists: [{type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
  },
  { collection: 'users' }
)

module.exports = User = mongoose.model('User', UserObjSchema)
