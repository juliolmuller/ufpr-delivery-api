const addressesResource = require('./addresses.resource')
const { cnpjUtils } = require('../utils')

function customersResource(customer) {
  if (Array.isArray(customer)) {
    return customer.map(customersResource)
  }

  return {
    id: customer.id,
    name: customer.name,
    cnpj: cnpjUtils.format(customer.cnpj),
    address: customer.address && addressesResource(customer.address),
    created_at: customer.createdAt,
    updated_at: customer.updatedAt,
  }
}

module.exports = customersResource
