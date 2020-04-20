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
    userId: req.body.userIdFromAuth0,
  })
  profile
    .save()
    .then(result => res.json({user: result, success: true}))
    .catch(error => res.json({error, success: false}))
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
    .populate({
      path: 'addedLists',
      populate: {
        path: 'items'
      }
    })
    .exec((error, data) => {
      if (error || !data) return res.json({error, success: false})
      res.json({user: data, success: true})
    })
}
