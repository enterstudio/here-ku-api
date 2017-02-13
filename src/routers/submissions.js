import express from 'express'
import Submission from '../models/Submission'
import handleError from '../handleError'

let router = express.Router()

router.route('/')
  .get((req, res) => {
    Submission.find()
      .then((submissions) => {
        res.json(submissions)
      })
      .catch(handleError(err))
  })
  .post((req, res) => {
    let submission = req.body
    Submission.create(submission)
      .then((submission) => {
        res.sendStatus(200)
      })
      .catch(handleError(res, err))
  })

export default router
