const { faker, passwordUtils } = require('../../utils')

function makeMotoboy() {
  const cpf = faker.cpf()
  const name = faker.name.findName()
  const phone = faker.phone.phoneNumber()
  const password = passwordUtils.hash('qwerty123')
  const created_at = faker.date.past(2)
  const updated_at = faker.date.between(created_at, new Date())

  return {
    name,
    cpf,
    phone,
    password,
    created_at,
    updated_at,
  }
}

async function up(queryInterface) {
  const motoboys = new Array(30).fill().map(makeMotoboy)

  await queryInterface.bulkInsert('motoboys', motoboys, {})
}

async function down(queryInterface) {
  await queryInterface.bulkDelete('motoboys', null, {})
}

module.exports = { up, down }
