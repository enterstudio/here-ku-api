import express from 'express'
import Submission from '../models/Submission'

let router = express.Router()

function handleError(err) {
  console.error(err)
  res.sendStatus(500)
}

router.route('/')
  .get((req, res) => {
    Submission.find()
      .then((submission) => {
        res.json(submission)
      })
      .catch(handleError(err))
  })
  .post((req, res) => {
    let submission = req.body
    Submission.create(submission)
      .then((submission) => {
        res.sendStatus(200)
      })
      .catch(handleError(err))
  })

export default router
