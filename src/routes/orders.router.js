const express = require('express')
const { ordersController } = require('../controllers')

const ordersRouter = express.Router()

ordersRouter.get('/', ordersController.index)
ordersRouter.post('/', ordersController.store)
ordersRouter.get('/:id', ordersController.show)
ordersRouter.put('/:id', ordersController.update)
ordersRouter.delete('/:id', ordersController.destroy)

module.exports = ordersRouter
