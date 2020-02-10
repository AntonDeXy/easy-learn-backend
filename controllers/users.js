const usersSchema = require('../models/User')
const mongoose = require('mongoose') 

const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

exports.changeInfo = (req, res) => {
  usersSchema.updateMany({ _id: req.params.id}, { nickname: req.body.article.nickname}, (err, result) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.send(result)
  })
}

exports.removeObjectFromProfile = (req, res) => {
  usersSchema
    .findByIdAndUpdate(
      {_id: req.body.userId},
      {'$pull': {addedCategories: req.body.categoryId}}
    )
    .exec((err, doc) => {
      if (err) return res.send(err)
      res.sendStatus(200)
    })
}

exports.addNewListToProfile = (req, res) => {
  usersSchema
    .findOneAndUpdate(
      {_id: req.body.userId},
      {'$push': {addedCategories: req.body.categoryId}}
    )
    .exec((err, doc) => {
      if (err) return res.send(err)
      res.sendStatus(200)
    })
}
