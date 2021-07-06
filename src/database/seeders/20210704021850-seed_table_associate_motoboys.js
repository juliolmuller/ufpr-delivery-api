const { faker } = require('../../utils')

async function up(queryInterface) {
  const [associates] = await queryInterface.sequelize.query('SELECT id from associates')
  const [motoboys] = await queryInterface.sequelize.query('SELECT id from motoboys')
  const records = motoboys.map((motoboy) => ({
    associate_id: faker.random.arrayElement(associates).id,
    motoboy_id: motoboy.id,
  }))

  await queryInterface.bulkInsert('associate_motoboys', records, {})
}

async function down(queryInterface) {
  await queryInterface.bulkDelete('associate_motoboys', null, {})
}

module.exports = { up, down }
