import express from 'express'
import Submission from '../models/Submission'

let router = express.Router()

router.route('/')
  .get((req, res, next) => {
    Submission.find()
      .then((submission) => {
        res.json(submission)
      })
      .catch((err) => console.error(err))
  })

export default router
