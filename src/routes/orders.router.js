const express = require('express')
const { ordersController } = require('../controllers')
const { authorize, validateOrder } = require('../middlewares')

const ordersRouter = express.Router()

ordersRouter.get('/', authorize('ADMIN', 'ASSOC', 'MOTOBOY'), ordersController.index)
ordersRouter.get('/:motoboy/:status', authorize('ADMIN', 'ASSOC', 'MOTOBOY'), ordersController.listOrderByStatus)
ordersRouter.get('/motoboy/:id', authorize('ADMIN', 'ASSOC', 'MOTOBOY'), ordersController.listOrderByMotoboy)
ordersRouter.get('/:id', authorize('ADMIN', 'ASSOC', 'MOTOBOY'), ordersController.show)
ordersRouter.post('/', authorize('ASSOC'), validateOrder(), ordersController.store)
ordersRouter.put('/:id', authorize('ASSOC', 'MOTOBOY'), validateOrder(), ordersController.update)
ordersRouter.delete('/:id', authorize('ASSOC'), ordersController.destroy)

module.exports = ordersRouter
