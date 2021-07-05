const express = require('express')
const { associatesController } = require('../controllers')
const { authorize } = require('../middlewares')

const associatesRouter = express.Router()

associatesRouter.get('/', authorize('ADMIN'), associatesController.index)
associatesRouter.post('/', authorize('ADMIN'), associatesController.store)
associatesRouter.get('/:cnpj', authorize('ADMIN', 'ASSOC'), associatesController.show)
associatesRouter.put('/:id', authorize('ADMIN', 'ASSOC'), associatesController.update)
associatesRouter.delete('/:id', authorize('ADMIN'), associatesController.destroy)

module.exports = associatesRouter
