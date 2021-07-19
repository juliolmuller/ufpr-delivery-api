/* eslint-disable newline-per-chained-call */
const { passwordUtils, yup } = require('../utils')
const { Associate } = require('../models')

const nameSchema = yup.string().required().name()
const cnpjSchema = yup.string().required().cnpj()
const newPasswordSchema = yup.string().required().password()
const oldPasswordSchema = yup.string().required()
  .test({
    name: 'old_password',
    message: 'Senha atual não confere.',
    async test(value) {
      if (!value) {
        return false
      }

      const associate = await Associate.findByPk(this.options.context.associateId)

      return associate && passwordUtils.compare(value, associate.password)
    },
  })

const newAssociateSchema = yup.object().shape({
  password: newPasswordSchema,
  name: nameSchema,
  cnpj: cnpjSchema,
})

const updateAssociateSchema = yup.object().shape({
  old_password: oldPasswordSchema,
  new_password: newPasswordSchema,
  name: nameSchema,
})

function validateAssociate(validationSchema) {
  const schema = validationSchema === 'NEW'
    ? newAssociateSchema
    : updateAssociateSchema

  return async (request, _response, next) => {
    const { address } = request.body

    request.body = await schema.validate({
      cnpj: request.body.cnpj,
      name: request.body.name,
      password: request.body.password,
      new_password: request.body.new_password,
      old_password: request.body.old_password,
    }, {
      context: { associateId: request.params.id },
      abortEarly: false,
    })
    request.body.address = address

    next()
  }
}

module.exports = validateAssociate
