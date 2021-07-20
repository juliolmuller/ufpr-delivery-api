const express = require('express')
const { associatesController } = require('../controllers')
const { authorize, validateAssociate, validateAddress } = require('../middlewares')

const associatesRouter = express.Router()

associatesRouter.get('/', authorize('ADMIN'), associatesController.index)
associatesRouter.get('/:cnpj', authorize('ADMIN', 'ASSOC'), associatesController.show)
associatesRouter.post('/', authorize('ADMIN'), validateAddress(), validateAssociate('NEW'), associatesController.store)
associatesRouter.put('/:id', authorize('ADMIN', 'ASSOC'), validateAddress(), validateAssociate('UPDATE'), associatesController.update)
associatesRouter.delete('/:id', authorize('ADMIN'), associatesController.destroy)

module.exports = associatesRouter
