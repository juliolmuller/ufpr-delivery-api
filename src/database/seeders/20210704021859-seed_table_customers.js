const { faker } = require('../../utils')

function makeCustomer({ associates }) {
  const cnpj = faker.cnpj()
  const name = faker.name.findName()
  const created_at = faker.date.past(2)
  const updated_at = faker.date.between(created_at, new Date())
  const associate_id = faker.random.arrayElement(associates).id

  return {
    name,
    cnpj,
    associate_id,
    created_at,
    updated_at,
  }
}

async function up(queryInterface) {
  const [associates] = await queryInterface.sequelize.query('SELECT id from associates')
  const customers = new Array(50).fill().map(() => makeCustomer({ associates }))

  await queryInterface.bulkInsert('customers', customers, {})
}

async function down(queryInterface) {
  await queryInterface.bulkDelete('customers', null, {})
}

module.exports = { up, down }
