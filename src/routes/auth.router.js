const express = require('express')
const { authController } = require('../controllers')

const authRouter = express.Router()

authRouter.post('/signin/:role', authController.signIn)

module.exports = authRouter
