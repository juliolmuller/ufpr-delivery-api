/* eslint-disable newline-per-chained-call */
const {  yup } = require('../utils')

const nameSchema = yup.string().required().name()
const cnpjSchema = yup.string().required().cnpj()
const newPasswordSchema = yup.string().required().password()

const associateSchema = yup.object().shape({
  password: newPasswordSchema,
  name: nameSchema,
  cnpj: cnpjSchema,
})


function validateAssociate() {

  return async (request, _response, next) => {
    const {address} = request.body
    request.body = await associateSchema.validate({
      cnpj: request.body.cnpj,
      name: request.body.name,
      password: request.body.password,
    }, {
      context: { associateId: request.params.id },
      abortEarly: false,
    })
    request.body.address = address

    next()
  }
}

module.exports = validateAssociate