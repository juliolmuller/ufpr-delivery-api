const express = require('express')
const { reportsController } = require('../controllers')
const { authorize } = require('../middlewares')

const reportsRouter = express.Router()

reportsRouter.get('/admin', authorize('ASSOC'), reportsController.administrative)
reportsRouter.get('/fin', authorize('ASSOC', 'MOTOBOY'), reportsController.financial)

module.exports = reportsRouter
