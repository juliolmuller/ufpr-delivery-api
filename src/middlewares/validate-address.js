const { yup } = require('../utils')

const addressSchemaSchema = yup.object().shape({
  street: yup.string().optional(),
  number: yup.string().optional(),
  complement: yup.string().optional(),
  city: yup.string().optional(),
  state: yup.string().optional().length(2),
  cep: yup.string().optional().length(8),
})

function validateAddress() {
  return async (request, _response, next) => {
    const { address } = request.body

    if (address) {
      request.body.address = await addressSchemaSchema.validate(address)
    }

    next()
  }
}

module.exports = validateAddress
