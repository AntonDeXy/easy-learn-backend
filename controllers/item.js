const itemsSchema = require('../models/itemsSchema')
const mongoose = require('mongoose') 

exports.create = (req, res) => {
  request = req.body
  const item = new itemsSchema({
    _id: new mongoose.Types.ObjectId(),
    title: request.title,
    word: request.word,
    translate: request.translate,
    date: new Date(),
  })
  item
    .save()
    .then(result => {console.log(result)})
    .catch(err => console.log(err))
    res.sendStatus(200)
}

exports.edit = (req, res) => {
  itemsSchema.updateMany({ _id: req.params.id}, { $set: req.body.newData }, (err, result) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.send(result)
  })
}

exports.remove = (req, res) => {
  itemsSchema.deleteOne({_id: req.params.id}, (err, result) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.send(result)
  })
}