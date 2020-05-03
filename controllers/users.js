const usersSchema = require('../models/UserObj')
const mongoose = require('mongoose') 

exports.removeObjectFromProfile = (req, res) => {
  usersSchema
    .findOneAndUpdate(
      {userId: req.params.userId},
      {'$pull': {addedLists: req.body.listId}}
    )
    .exec((err, doc) => {
      if (err) return res.json({success: false})
      res.json({success: true})
    })
}

exports.createProfile = (req, res) => {
  const profile = new usersSchema({
    _id: new mongoose.Types.ObjectId(),
    userId: req.body.userIdFromAuth0,
    email: req.body.email
  })
  profile
    .save()
    .then(result => res.json({user: result, success: true}))
    .catch(error => res.json({error, success: false}))
  }

exports.addNewTestToProfile = (req, res) => {
  usersSchema
    .findOneAndUpdate(
      {userId: req.body.userId},
      {'$push': {tests: req.body.testId}}
    )
    .exec((error, doc) => {
      if (error) return res.json({error, success: false})
      res.json({success: true})
    })
}

exports.addNewListToProfile = (req, res) => {
  usersSchema
    .findOneAndUpdate(
      {userId: req.body.userId},
      {'$push': {addedLists: req.body.listId}}
    )
    .exec((error, doc) => {
      if (error) return res.json({error, success: false})
      res.json({success: true})
    })
}

exports.getProfile = (req, res) => {
  usersSchema
    .findOne(
      {userId: req.params.userId}
    )
    .populate(
      {
        path: 'addedLists',
        populate: {
          path: 'items'
        }
      }
    )
    .populate('tests')
    .exec((error, data) => {
      if (error) return res.json({error, success: false})
      res.json({user: data, success: true})
    })
}
