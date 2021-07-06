const { faker, passwordUtils } = require('../../utils')

function makeMotoboy() {
  const cpf = faker.cpf()
  const name = faker.name.findName()
  const phone = faker.phone.phoneNumber()
  const password = passwordUtils.hash('qwerty123')
  const createdAt = faker.date.past(2)
  const updatedAt = faker.date.between(createdAt, new Date())

  return {
    name,
    cpf,
    phone,
    password,
    createdAt,
    updatedAt,
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
