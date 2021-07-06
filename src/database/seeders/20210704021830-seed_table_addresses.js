const { faker } = require('../../utils')

function makeAddress({ associates = null, customers = null }) {
  const street = `${faker.address.streetSuffix()} ${faker.address.streetAddress()}`
  const number = Math.floor(Math.random() * 10000)
  const complement = faker.address.secondaryAddress()
  const cep = faker.address.zipCode('########')
  const state = faker.address.stateAbbr()
  const city = faker.address.cityName()
  const created_at = faker.date.past(2)
  const updated_at = faker.date.between(created_at, new Date())
  const associate_id = associates && faker.random.arrayElement(associates).id
  const customer_id = customers && faker.random.arrayElement(customers).id

  return {
    cep,
    city,
    state,
    street,
    number,
    complement,
    associate_id,
    customer_id,
    created_at,
    updated_at,
  }
}

async function up(queryInterface) {
  const [customers] = await queryInterface.sequelize.query('SELECT id from customers')
  const [associates] = await queryInterface.sequelize.query('SELECT id from associates')
  const customersAddresses = customers.map(({ id }) => makeAddress({ customers: [{ id }] }))
  const associatesAddresses = associates.map(({ id }) => makeAddress({ associates: [{ id }] }))

  await queryInterface.bulkInsert('addresses', [
    ...associatesAddresses,
    ...customersAddresses,
  ], {})
}

async function down(queryInterface) {
  await queryInterface.bulkDelete('addresses', null, {})
}

module.exports = { up, down }
