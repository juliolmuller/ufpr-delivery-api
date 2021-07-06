const { faker } = require('../../utils')

async function up(queryInterface) {
  const [associates] = await queryInterface.sequelize.query('SELECT id from associates')
  const [customers] = await queryInterface.sequelize.query('SELECT id from customers')
  const records = customers.map((customer) => ({
    associate_id: faker.random.arrayElement(associates).id,
    customer_id: customer.id,
  }))

  await queryInterface.bulkInsert('associate_customers', records, {})
}

async function down(queryInterface) {
  await queryInterface.bulkDelete('associate_customers', null, {})
}

module.exports = { up, down }
