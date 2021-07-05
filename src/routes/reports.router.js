const express = require('express')
const { reportsController } = require('../controllers')

const reportsRouter = express.Router()

reportsRouter.get('/admin', reportsController.administrative)
reportsRouter.get('/fin', reportsController.financial)

module.exports = reportsRouter
