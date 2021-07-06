const { faker } = require('../../utils')

function makeAddress({ associates = null, customers = null }) {
  const street = `${faker.address.streetSuffix()} ${faker.address.streetAddress()}`
  const number = Math.floor(Math.random() * 10000)
  const complement = faker.address.secondaryAddress()
  const cep = faker.address.zipCode('########')
  const state = faker.address.stateAbbr()
  const city = faker.address.cityName()
  const associateId = associates && faker.random.arrayElement(associates).id
  const customerId = customers && faker.random.arrayElement(customers).id
  const createdAt = faker.date.past(2)
  const updatedAt = faker.date.between(createdAt, new Date())

  return {
    cep,
    city,
    state,
    street,
    number,
    complement,
    associateId,
    customerId,
    createdAt,
    updatedAt,
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
