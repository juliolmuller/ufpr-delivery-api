const { faker } = require('../../utils')

function makeCustomer() {
  const cnpj = faker.cnpj()
  const name = faker.company.companyName()
  const createdAt = faker.date.past(2)
  const updatedAt = faker.date.between(createdAt, new Date())

  return {
    name,
    cnpj,
    createdAt,
    updatedAt,
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
