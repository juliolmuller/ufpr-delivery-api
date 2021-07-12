const express = require('express')
const { associatesController } = require('../controllers')
const { authorize } = require('../middlewares')

const associatesRouter = express.Router()

associatesRouter.get('/', associatesController.index)
associatesRouter.post('/', associatesController.store)
associatesRouter.get('/:cnpj', associatesController.show)
associatesRouter.put('/:id', associatesController.update)
associatesRouter.delete('/:id', associatesController.destroy)

module.exports = associatesRouter
