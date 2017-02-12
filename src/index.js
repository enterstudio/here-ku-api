import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import passport from 'passport'
import FacebookStrategy from 'passport-facebook'
import submissionsRouter from './routers/submissions'
import User from './models/User'

const apiPrefix = '/api'
const PORT = process.env.PORT || 3000
const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use(cors())
app.options('*', cors())

app.use(morgan('dev'))

app.use(passport.initialize())
passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRECT,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id']
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({facebookId: profile.id }, function (err, user) {
      return cb(err, user)
    })
  }
))

app.get('/auth/facebook',
  passport.authenticate('facebook'))

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    session: false,
    failureRedirect: '/login'
  }),
  function(req, res) {
    res.sendStatus(200)
  })

app.use(`${apiPrefix}/submissions`, submissionsRouter)

app.listen(PORT, () => {
  console.log(`listening on ${PORT}...`)
})
