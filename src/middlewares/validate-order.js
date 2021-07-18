const { yup } = require('../utils')

const descriptionSchema = yup.string().name()
const customerSchema = yup.number().required()
const motoboySchema = yup.number().required()


const orderSchema = yup.object().shape({
    description: descriptionSchema,
    customerId: customerSchema,
    motoboyId: motoboySchema,
})

function validateOrder() {
    return async (request, _response, next) => {
        request.body = await orderSchema.validate({
            description: request.body.description,
            customerId: request.body.customerId,
            motoboyId: request.body.motoboyId,
        }, {
            context: { orderId: request.params.id },
            abortEarly: false,
        })

        next()
    }
}

module.exports = validateOrder