const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserObjSchema = new Schema(
  {
    _id: mongoose.Schema.ObjectId,
    userId: {
      type: String,
      require: true,
      unique: true
    },
    addedLists: [{type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
    tests: [{type: mongoose.Schema.Types.ObjectId, ref: 'Test' }]
  },
  { collection: 'users' }
)

module.exports = User = mongoose.model('User', UserObjSchema)
