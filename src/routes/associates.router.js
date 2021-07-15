const express = require('express')
const { associatesController } = require('../controllers')
const { validateAssociate, validateAddress } = require('../middlewares')


const associatesRouter = express.Router()

associatesRouter.get('/', associatesController.index)
associatesRouter.get('/:cnpj', associatesController.show)
associatesRouter.post('/', validateAddress(), validateAssociate(), associatesController.store)
associatesRouter.put('/:id', validateAddress(), validateAssociate(), associatesController.update)
associatesRouter.delete('/:id', associatesController.destroy)

module.exports = associatesRouter
