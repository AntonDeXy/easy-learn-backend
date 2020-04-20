const listSchema = require('../models/listSchema')
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
      listSchema
      .findOneAndUpdate(
        {_id: req.body.listId},
        {"$push": {items: result.id}}
      )
      .exec((err,doc) => {
        if (err) {
          return res.json({err, success: false})
        }
        res.json({doc: item, success: true})
      })
    })
}

exports.edit = (req, res) => {
  itemsSchema.updateMany({ _id: req.params.itemId}, { $set: req.body }, (err, result) => {
    if (err || result.nModified < 1) {
      console.log(err)
      return res.json({err, success: false})
    }
    res.json({doc: result, success: true})
  })
}

exports.remove = (req, res) => {
  itemsSchema.deleteOne({_id: req.params.itemId}, (err, result) => {
    if (err || result.deletedCount < 1) {
      console.log(err)
      return res.json({err, success: false})
    }
    res.json({doc: result, success: true})
  })
}

exports.removeMany = (req, res) => {
  itemsSchema.deleteMany({_id: {$in: req.body.ids}}, (err, result) => {
    if (err) {
      console.log(err)
      return res.json({err, success: false})
    }
    res.json({doc: result, success: true})
  })
}