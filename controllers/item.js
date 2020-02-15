const categorySchema = require('../models/categorySchema')
const itemsSchema = require('../models/itemsSchema')
const mongoose = require('mongoose') 

exports.create = (req, res) => {
  request = req.body
  const item = new itemsSchema({
    _id: new mongoose.Types.ObjectId(),
    word: request.word,
    translate: request.translate,
    date: new Date(),
  })
  item
    .save()
    .then(result => {
      categorySchema
      .findOneAndUpdate(
        {_id: req.body.categoryId},
        {"$push": {items: result.id}}
      )
      .exec((err,doc) => {
        if (err) return res.send(err)
        res.sendStatus(200)
      })
      // .catch(err => console.log(err))
    })
    // .catch(err => console.log(err))
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

exports.removeMany = (req, res) => {
  itemsSchema.deleteMany({_id: {$in: req.body.ids}}, (err, result) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.send(result)
  })
}