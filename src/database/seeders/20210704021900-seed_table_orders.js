const { faker } = require('../../utils')

function makeOrder({ associates, customers, motoboys }) {
  const value = Math.round(Math.random() * 1000) / 100
  const status = faker.random.arrayElement(['PENDING', 'COMPLETE'])
  const description = faker.lorem.text().replace(/[\n\r][ ][[\n\r]/g, '\n')
  const motoboyId = faker.random.arrayElement(motoboys).id
  const customerId = faker.random.arrayElement(customers).id
  const associateId = faker.random.arrayElement(associates).id
  const createdAt = faker.date.past(2)
  const updatedAt = faker.date.between(createdAt, new Date())

  return {
    value,
    status,
    description,
    motoboyId,
    customerId,
    associateId,
    createdAt,
    updatedAt,
  }
}

async function up(queryInterface) {
  const [associates] = await queryInterface.sequelize.query('SELECT id from associates')
  const [customers] = await queryInterface.sequelize.query('SELECT id from customers')
  const [motoboys] = await queryInterface.sequelize.query('SELECT id from associates')
  const orders = new Array(200).fill().map(() => makeOrder({ associates, customers, motoboys }))

  await queryInterface.bulkInsert('orders', orders, {})
}

async function down(queryInterface) {
  await queryInterface.bulkDelete('orders', null, {})
}

module.exports = { up, down }
