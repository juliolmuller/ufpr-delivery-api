const express = require('express')
const { customersController } = require('../controllers')
const { authorize, validateCustomer, validateAddress } = require('../middlewares')

const customersRouter = express.Router()

customersRouter.get('/', authorize('ADMIN', 'ASSOC'), customersController.index)
customersRouter.get('/:cnpj', authorize('ADMIN', 'ASSOC'), customersController.show)
customersRouter.post('/', authorize('ASSOC'), validateCustomer(), validateAddress(), customersController.store)
customersRouter.put('/:id', authorize('ASSOC'), validateCustomer(), validateAddress(),  customersController.update)
customersRouter.delete('/:id', authorize('ASSOC'), customersController.destroy)

module.exports = customersRouter
