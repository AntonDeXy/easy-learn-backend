const usersSchema = require('../models/UserObj')
const mongoose = require('mongoose') 

exports.removeObjectFromProfile = (req, res) => {
  usersSchema
    .findOneAndUpdate(
      {userId: req.body.userId},
      {'$pull': {addedCategories: req.body.categoryId}}
    )
    .exec((err, doc) => {
      if (err) return res.send(err)
      res.sendStatus(200)
    })
}

exports.createProfile = (req, res) => {
  const profile = new usersSchema({
    userId: req.body.userIdFromAuth0,
  })
  profile
    .save()
    .then(result => res.send(result))
    .catch(err => res.send(err))
    // .exec((err, doc) => {
    //   if (err) return res.send(err)
    //   res.sendStatus(200)
    //   res.send(doc)
    // })
  }

exports.addNewListToProfile = (req, res) => {
  usersSchema
    .findOneAndUpdate(
      {userId: req.body.userId},
      {'$push': {addedCategories: req.body.categoryId}}
    )
    .exec((err, doc) => {
      if (err) return res.send(err)
      res.sendStatus(200)
    })
}

exports.getProfile = (req, res) => {
  usersSchema
    .findOne(
      {userId: req.params.userId}
    )
    .populate({
      path: 'addedCategories',
      populate: {
        path: 'items'
      }
    })
    .exec((err, doc) => {
      if (err) return res.send(err)
      res.send(doc)
    })
}
