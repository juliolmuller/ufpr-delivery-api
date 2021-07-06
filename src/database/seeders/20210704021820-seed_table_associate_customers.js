const { faker } = require('../../utils')

async function up(queryInterface) {
  const [associates] = await queryInterface.sequelize.query('SELECT id from associates')
  const [customers] = await queryInterface.sequelize.query('SELECT id, createdAt, updatedAt from customers')
  const records = customers.map(({ id, ...timestamps }) => ({
    associateId: faker.random.arrayElement(associates).id,
    customerId: id,
    ...timestamps,
  }))

  await queryInterface.bulkInsert('associateCustomers', records, {})
}

async function down(queryInterface) {
  await queryInterface.bulkDelete('associateCustomers', null, {})
}

module.exports = { up, down }
