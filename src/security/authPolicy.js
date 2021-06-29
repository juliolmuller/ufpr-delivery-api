const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function isPasswordValid(password) {
  return typeof password === 'string'
  && password.match(/[a-z]/i)
  && password.match(/[0-9]/)
  && password.length >= 8
}

function hashPassword(plainPassword) {
  const salt = bcrypt.genSaltSync()
  const hashedPassword = bcrypt.hashSync(plainPassword, salt)

  return hashedPassword
}

function comparePasswords(plainPassword, hashedPasswords) {
  return bcrypt.compareSync(plainPassword, hashedPasswords)
}

function generateToken(embeddedData) {
  return jwt.sign(embeddedData, process.env.JWT_SECRET)
}

function validateToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
  isPasswordValid,
  hashPassword,
  comparePasswords,
  generateToken,
  validateToken,
}
