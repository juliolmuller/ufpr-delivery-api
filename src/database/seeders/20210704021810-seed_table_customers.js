const { faker } = require('../../utils')

function makeCustomer() {
  const cnpj = faker.cnpj()
  const name = faker.name.findName()
  const created_at = faker.date.past(2)
  const updated_at = faker.date.between(created_at, new Date())

  return {
    name,
    cnpj,
    created_at,
    updated_at,
  }
}

async function up(queryInterface) {
  const customers = new Array(50).fill().map(makeCustomer)

  await queryInterface.bulkInsert('customers', customers, {})
}

async function down(queryInterface) {
  await queryInterface.bulkDelete('customers', null, {})
}

module.exports = { up, down }
