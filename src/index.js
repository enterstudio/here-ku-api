import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
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

app.use(`${apiPrefix}/auth`, authRouter)
app.use(`${apiPrefix}/submissions`, submissionsRouter)

//this must come AFTER routes
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.sendStatus(401)
  }
})

app.listen(PORT, () => {
  console.log(`listening on ${PORT}...`)
})
