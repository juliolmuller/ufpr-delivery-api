const { cpfUtils } = require('../utils')

function motoboysResource(motoboy) {
  if (Array.isArray(motoboy)) {
    return motoboy.map(motoboysResource)
  }

  return {
    id: motoboy.id,
    name: motoboy.name,
    phone: motoboy.phone,
    cpf: cpfUtils.format(motoboy.cpf),
    created_at: motoboy.createdAt,
    updated_at: motoboy.updatedAt,
  }
}

module.exports = motoboysResource
