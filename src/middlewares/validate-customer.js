const { yup } = require('../utils')

const nameSchema = yup.string().required().name()
const cnpjSchema = yup.string().required().cnpj()

const customerSchema = yup.object().shape({
    name: nameSchema,
    cnpj: cnpjSchema,
})

function validateCustomer() {
    return async (request, _response, next) => {
        const {address} = request.body
        request.body = await customerSchema.validate({
            cnpj: request.body.cnpj,
            name: request.body.name,
        }, {
            context: { customerId: request.params.id },
            abortEarly: false,
        })
        request.body.address  = address

        next()
    }
}

module.exports = validateCustomer