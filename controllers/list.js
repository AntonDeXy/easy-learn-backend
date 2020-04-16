const listSchema = require('../models/listSchema')
const mongoose = require('mongoose') 

exports.categoriesByAuthor = (req, res) => {
  listSchema
  .find({authorId: req.params.authorId})
  .populate('items')
  .exec((err, doc)=> {
    if (err) {
      console.log(err)
      return res.json({success: false})
    }
    res.json({data: doc, success: true})
  })
}

exports.categoryById = (req, res) => {
  listSchema
  .find({_id: req.params.categoryId})
  .populate('items')
  .exec((err, doc)=> {
    if (err || !doc) {
      return res.json({isExist: false})
    }
    return res.send({isExist: true, doc})
  })
}

// exports.getAll = (req, res) => {
//   listSchema
//   .find({})
//   .populate('items')
//   .exec((err, doc)=> {
//     if (err) {
//       console.log(err)
//       return res.sendStatus(500)
//     }
//     res.send(doc)
//   })
// }

exports.create = (req, res) => {
  request = req.body
  const category = new listSchema({
    _id: new mongoose.Types.ObjectId(),
    name: request.name,
    items: request.items || [],
    authorId: request.authorId,
    date: new Date(),
  })
  category
    .save()
    .then(result => res.json({doc: result, success: true}))
    .catch(err => res.json({success: false}))
}

exports.edit = (req, res) => {
  listSchema.updateMany({ _id: req.params.id}, { $set: req.body }, (err, result) => {
    if (err) {
      console.log(err)
      return res.json({success: false})
    }
    res.json({doc: result, success: true})
  })
}

exports.remove = (req, res) => {
  listSchema.deleteOne({_id: req.params.id}, (err, result) => {
    if (err) {
      console.log(err)
      return res.json({success: false})
    }
    res.json({success: true})
  })
}