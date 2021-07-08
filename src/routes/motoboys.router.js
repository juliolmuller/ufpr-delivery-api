const express = require('express')
const { motoboysController } = require('../controllers')
const { authorize, validateMotoboy } = require('../middlewares')

const motoboysRouter = express.Router()

motoboysRouter.get('/', authorize('ADMIN', 'ASSOC'), motoboysController.index)
motoboysRouter.get('/:cpf', authorize('ADMIN', 'ASSOC', 'MOTOBOY'), motoboysController.show)
motoboysRouter.post('/', authorize('ASSOC'), validateMotoboy('NEW'), motoboysController.store)
motoboysRouter.put('/:id', authorize('ASSOC', 'MOTOBOY'), validateMotoboy('UPDATE'), motoboysController.update)
motoboysRouter.delete('/:id', authorize('ASSOC'), motoboysController.destroy)

module.exports = motoboysRouter
