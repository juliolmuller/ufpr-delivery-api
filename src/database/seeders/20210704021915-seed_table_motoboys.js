const { faker, hashPassword } = require('../../utils')

function makeMotoboy({ associates }) {
  const cpf = faker.cpf()
  const name = faker.name.findName()
  const phone = faker.phone.phoneNumber()
  const password = hashPassword('qwerty123')
  const created_at = faker.date.past(2)
  const updated_at = faker.date.between(created_at, new Date())
  const associate_id = faker.random.arrayElement(associates).id

  return {
    name,
    cpf,
    phone,
    password,
    associate_id,
    created_at,
    updated_at,
  }
}

async function up(queryInterface) {
  const [associates] = await queryInterface.sequelize.query('SELECT id from associates')
  const motoboys = new Array(30).fill().map(() => makeMotoboy({ associates }))

  await queryInterface.bulkInsert('motoboys', motoboys, {})
}

async function down(queryInterface) {
  await queryInterface.bulkDelete('motoboys', null, {})
}

module.exports = { up, down }
