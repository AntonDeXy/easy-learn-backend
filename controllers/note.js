const noteSchema = require('../models/notesSchema')
const mongoose = require('mongoose') 

exports.notesByAuthor = (req, res) => {
  noteSchema
  .find({authorId: req.params.authorId})
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
  const note = new noteSchema({
    _id: new mongoose.Types.ObjectId(),
    authorId: request.authorId,
    content: request.content,
    date: new Date(),
  })
  note
    .save()
    .then(result => console.log(result))
    .catch(err => console.log(err))
    res.sendStatus(200)
}

exports.edit = (req, res) => {
  noteSchema.update({ _id: req.params.id}, { content: req.body.content }, (err, result) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.send(result)
  })
}

exports.remove = (req, res) => {
  noteSchema.deleteOne({_id: req.params.id}, (err, result) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.sendStatus(200)
  })
}