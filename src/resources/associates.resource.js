const addressesResource = require('./addresses.resource')
const customersResource = require('./customers.resource')
const motoboysResource = require('./motoboys.resource')
const { cnpjUtils } = require('../utils')

function associatesResource(associate) {
  if (Array.isArray(associate)) {
    return associate.map(associatesResource)
  }

  return {
    id: associate.id,
    name: associate.name,
    cnpj: cnpjUtils.format(associate.cnpj),
    address: associate.address && addressesResource(associate.address),
    customers: associate.customers && customersResource(associate.motoboys),
    motoboys: associate.motoboys && motoboysResource(associate.motoboys),
    created_at: associate.createdAt,
    updated_at: associate.updatedAt,
  }
}

module.exports = associatesResource
