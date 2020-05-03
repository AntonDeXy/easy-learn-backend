const testsSchema = require('../models/testsSchema')
const mongoose = require('mongoose') 

exports.create = (req, res) => {
  request = req.body
  const test = new testsSchema({
    _id: new mongoose.Types.ObjectId(),
    userId: request.userId,
    type: request.test.type,
    questionsCount: request.test.questionsCount,
    rightAnswersCount: request.test.rightAnswersCount,
    listName: request.test.listName,
    items: request.test.items,
    date: Date.now()
  })
  test
    .save()
    .then(result => res.json({doc: result, success: true}))
    .catch(err => res.json({success: false}))
}