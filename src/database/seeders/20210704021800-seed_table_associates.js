const { faker, passwordUtils } = require('../../utils')

function makeAssociate() {
  const cnpj = faker.cnpj()
  const name = faker.name.findName()
  const password = passwordUtils.hash('qwerty123')
  const createdAt = faker.date.past(2)
  const updatedAt = faker.date.between(createdAt, new Date())

  return {
    name,
    cnpj,
    password,
    createdAt,
    updatedAt,
  }
}

async function up(queryInterface) {
  const associates = new Array(10).fill().map(makeAssociate)

  await queryInterface.bulkInsert('associates', associates, {})
}

async function down(queryInterface) {
  await queryInterface.bulkDelete('associates', null, {})
}

module.exports = { up, down }
