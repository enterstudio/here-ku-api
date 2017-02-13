import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import passport from 'passport'
import FacebookStrategy from 'passport-facebook'
import jwt from 'jsonwebtoken'
import jwtAuth from 'express-jwt'
import submissionsRouter from './routers/submissions'
import User from './models/User'

const apiPrefix = '/api'
const PORT = process.env.PORT || 3000
const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use(morgan('dev'))

app.use(passport.initialize())
passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRECT,
    callbackURL: 'http://localhost:5000/auth/facebook/callback',
    profileFields: ['id', 'name']
  },
  function(accessToken, refreshToken, profile, cb) {
    var newUser = {
      facebookId: profile.id,
      name: `${profile.name.givenName} ${profile.name.familyName}`
    }
    User.findOne({
      facebookId: profile.id,
    }, function (err, user) {
      if(user === null) {
        User.create(newUser, (err, user) => {
          return cb(err, user)
        })
      }
      return cb(err, user)
    })
  }
))

const jwtSecrect = process.env.JWT_SECRECT

app.get('/', jwtAuth({secret: jwtSecrect}), (req, res) => {
  console.log(req.user)
  res.sendStatus(200)
})

app.use(`${apiPrefix}/submissions`, submissionsRouter)

//this must come AFTER routes
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.sendStatus(401)
  }
})

app.get('/auth/facebook',
  passport.authenticate('facebook'))

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    session: false
  }), (req, res) => {
    jwt.sign(
      {user: req.user._id},
      jwtSecrect,
      {expiresIn: '1m'},
      (err, token) => {
        res.send(token)
      })
  })

app.listen(PORT, () => {
  console.log(`listening on ${PORT}...`)
})
