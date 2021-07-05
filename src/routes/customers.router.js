const express = require('express')
const { customersController } = require('../controllers')

const customersRouter = express.Router()

customersRouter.get('/', customersController.index)
customersRouter.post('/', customersController.store)
customersRouter.get('/:cnpj', customersController.show)
customersRouter.put('/:id', customersController.update)
customersRouter.delete('/:id', customersController.destroy)

module.exports = customersRouter
