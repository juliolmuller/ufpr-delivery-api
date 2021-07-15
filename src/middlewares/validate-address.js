const {  yup } = require('../utils')



const streetSchema = yup.string().required()
const numberSchema = yup.string().required()
const complementSchema = yup.string().required()
const citySchema = yup.string().required()
const stateSchema = yup.string().required()
const cepSchema = yup.string().required().length(8)

const addressSchemaSchema = yup.object().shape({
      street: streetSchema,
      number: numberSchema,
      complement: complementSchema,
      city: citySchema,
      state: stateSchema,
      cep: cepSchema,
})

function validateAddress(){
  return async (request, _response, next) => {
    let {address} = request.body
    if (address){
      request.body.address = await addressSchemaSchema.validate(address)
    }
    next()
  }
}
module.exports= validateAddress