const express = require('express')
const { motoboysController } = require('../controllers')

const motoboysRouter = express.Router()

motoboysRouter.get('/', motoboysController.index)
motoboysRouter.post('/', motoboysController.store)
motoboysRouter.get('/:cpf', motoboysController.show)
motoboysRouter.put('/:id', motoboysController.update)
motoboysRouter.delete('/:id', motoboysController.destroy)

module.exports = motoboysRouter
