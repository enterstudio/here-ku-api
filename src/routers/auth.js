import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import handleError from '../handleError'

let router = express.Router()

router.use(passport.initialize())
passport.use(User.createStrategy())

function jwtSend(req, res, user) {
  jwt.sign(
    {user: user._id},
    process.env.JWT_SECRECT,
    {expiresIn: '1h'},
    (err, token) => {
      if(err) {
        handleError(res, err)
      } else {
        res.send(token)
      }
    })
}

router.post('/login',
  passport.authenticate(
    'local',
    {session: false}),
    (req, res) => {
      jwtSend(req, res, req.user)
})

router.post('/register', (req, res) => {
  User.register(
    new User({username: req.body.username}),
    req.body.password,
    (err, user) => {
      if(err) {
        handleError(res, err)
      } else {
        jwtSend(req, res, user)
      }
    })
})

export default router
