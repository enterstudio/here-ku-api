import express from 'express'
import Submission from '../models/Submission'
import handleError from '../handleError'
import jwtAuth from '../jwtAuth'
import User from '../models/User'

let router = express.Router()

router.use(jwtAuth)

router.route('/:id')
  .get((req, res) => {
    Submission.findById(req.params.id)
      .then((submissions) => {
        res.json(submissions)
      })
      .catch((err) => handleError(err))
  })
  .delete((req, res) => {
    Submission.findByIdAndRemove(req.params.id)
      .then((submissions) => {
        res.sendStatus(200)
      })
      .catch((err) => handleError(err))
  })

router.route('/')
  .get((req, res, next) => {
    if(req.query) next()
    const {lon, lat} = req.query
    //https://docs.mongodb.com/manual/reference/operator/query/centerSphere/#example
    Submission.find({
      location: {
        $geoWithin: {$centerSphere: [[lon, lat], (75/5280)/3963.2] }
      }})
      .then((submissions) => {
        res.json(submissions)
      })
      .catch((err) => console.error(err))
  })
  .get((req, res) => {
    User.findById(req.auth.user, (err, user) => {
      Submission.find({_user: user})
      .then((submissions) => {
        res.json(submissions)
      })
      .catch((err) => console.error(err))
    })
  })
  .post((req, res) => {
    let submission = req.body
    User.findById(req.auth.user, (err, user) => {
      submission._user = user
      Submission.create(submission)
        .then((submission) => {
          res.sendStatus(200)
        })
        .catch((err) => console.error(err))
    })
  })

export default router
