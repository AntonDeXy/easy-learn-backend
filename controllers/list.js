const listSchema = require('../models/listSchema')
const mongoose = require('mongoose') 

exports.listsByAuthor = (req, res) => {
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

exports.listById = (req, res) => {
  listSchema
  .find({_id: req.params.listId})
  .populate('items')
  .exec((err, doc)=> {
    if (err || !doc || doc.length < 1) {
      return res.json({isExist: false})
    }
    return res.json({isExist: true, list: doc})
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
  listSchema.updateMany({ _id: req.params.listId}, { $set: req.body }, (err, result) => {
    if (err || result.nModified < 1) {
      console.log(err)
      return res.json({success: false})
    }
    res.json({doc: result, success: true})
  })
}

exports.remove = (req, res) => {
  listSchema.deleteOne({_id: req.params.listId}, (err, result) => {
    if (err || result.deletedCount < 1) {
      console.log(err)
      return res.json({success: false})
    }
    res.json({success: true})
  })
}