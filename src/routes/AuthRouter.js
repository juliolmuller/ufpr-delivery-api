const express = require('express')
const { AuthController } = require('../controllers')

const AuthRouter = express.Router()

AuthRouter.post('/signin', AuthController.signIn)

module.exports = AuthRouter
