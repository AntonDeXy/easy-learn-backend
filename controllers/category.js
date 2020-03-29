const categorySchema = require('../models/categorySchema')
const mongoose = require('mongoose') 

exports.categoriesByAuthor = (req, res) => {
  categorySchema
  .find({authorId: req.params.authorId})
  .populate('items')
  .exec((err, doc)=> {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.send(doc)
  })
}

exports.getAll = (req, res) => {
  categorySchema
  .find({})
  .populate('items')
  // .populate('authorId')
  .exec((err, doc)=> {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.send(doc)
  })
}

exports.create = (req, res) => {
  request = req.body
  const category = new categorySchema({
    _id: new mongoose.Types.ObjectId(),
    title: request.title,
    items: request.items || [],
    authorId: request.authorId,
    date: new Date(),
  })
  category
    .save()
    .then(result => {console.log(result)})
    .catch(err => console.log(err))
    res.sendStatus(200)
}

exports.edit = (req, res) => {
  categorySchema.updateMany({ _id: req.params.id}, { $set: req.body }, (err, result) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.send(result)
  })
}

exports.remove = (req, res) => {
  categorySchema.deleteOne({_id: req.params.id}, (err, result) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.sendStatus(200)
  })
}