const express = require('express')
const { ordersController } = require('../controllers')
const { authorize } = require('../middlewares')

const ordersRouter = express.Router()

ordersRouter.get('/', authorize('ADMIN', 'ASSOC', 'MOTOBOY'), ordersController.index)
ordersRouter.get('/:id', authorize('ADMIN', 'ASSOC', 'MOTOBOY'), ordersController.show)
ordersRouter.post('/', authorize('ASSOC'), ordersController.store)
ordersRouter.put('/:id', authorize('ASSOC', 'MOTOBOY'), ordersController.update)
ordersRouter.delete('/:id', authorize('ASSOC'), ordersController.destroy)

module.exports = ordersRouter
