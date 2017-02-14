import jwt from 'express-jwt'

const jwtAuth = jwt({
  secret: process.env.JWT_SECRECT,
  requestProperty: 'auth'
})

export default jwtAuth
