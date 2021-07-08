/* eslint-disable newline-per-chained-call */
const { passwordUtils, yup } = require('../utils')
const { ResourceNotFound } = require('../errors')
const { Motoboy } = require('../models')

const nameSchema = yup.string().required().name()
const phoneSchema = yup.string().required().phone()
const cpfSchema = yup.string().required().cpf()
const newPasswordSchema = yup.string().required().password()
const oldPasswordSchema = yup.mixed().required()
  .transform(([oldPassword]) => oldPassword)
  .test({
    name: 'old_password',
    message: 'Senha atual não confere.',
    async test([oldPassword, motoboyId]) {
      if (!oldPassword) {
        return false
      }

      const motoboy = await Motoboy.findByPk(motoboyId)

      if (!motoboy) {
        throw new ResourceNotFound(`Motoboy com ID '${motoboyId}' não encontrado.`)
      }

      return passwordUtils.compare(oldPassword, motoboy.password)
    },
  })

const newMotoboySchema = yup.object().shape({
  password: newPasswordSchema,
  phone: phoneSchema,
  name: nameSchema,
  cpf: cpfSchema,
})

const updateMotoboySchema = yup.object().shape({
  old_password: oldPasswordSchema,
  new_password: newPasswordSchema,
  phone: phoneSchema,
  name: nameSchema,
})

function validateMotoboy(validationSchema) {
  const schema = validationSchema === 'NEW'
    ? newMotoboySchema
    : updateMotoboySchema

  return async (request, _response, next) => {
    request.body = await schema.validate({
      cpf: request.body.cpf,
      name: request.body.name,
      phone: request.body.phone,
      password: request.body.password,
      new_password: request.body.new_password,
      old_password: [
        request.body.new_password,
        request.params.id,
      ], // injeta múltiplos valores para fazer uso no teste
    }, { abortEarly: false })

    next()
  }
}

module.exports = validateMotoboy
