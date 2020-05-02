const mongoose = require('mongoose')

const testsSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  userId: String,
  type: String,
  questionsCount: Number,
  rightAnswersCount: Number,
  items: [
    {
      value1: String,
      rightAnswer: String,
      usersAnswer: String,
      variants: [
        {
          value: String,
          key: Number
        }
      ]
    }
  ]
}, {collection: 'tests'})

module.exports = Test = mongoose.model('Test', testsSchema)