import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import jwtAuth from 'express-jwt'
import cors from 'cors'
import authRouter from './routers/auth'
import submissionsRouter from './routers/submissions'

const apiPrefix = '/api'
const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.options('*', cors())

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use(morgan('dev'))

app.get('/', jwtAuth({secret: process.env.JWT_SECRECT}), (req, res) => {
  console.log(req.user)
  res.sendStatus(200)
})

//this must come AFTER routes
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.sendStatus(401)
  }
})

app.use(`${apiPrefix}/auth`, authRouter)
app.use(`${apiPrefix}/submissions`, submissionsRouter)

app.listen(PORT, () => {
  console.log(`listening on ${PORT}...`)
})
