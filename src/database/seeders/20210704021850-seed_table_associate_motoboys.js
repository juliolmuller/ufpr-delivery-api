const { faker } = require('../../utils')

async function up(queryInterface) {
  const [associates] = await queryInterface.sequelize.query('SELECT id from associates')
  const [motoboys] = await queryInterface.sequelize.query('SELECT id, createdAt, updatedAt from motoboys')
  const records = motoboys.map(({ id, ...timestamps }) => ({
    associateId: 1,
    motoboyId: id,
    ...timestamps,
  }))

  await queryInterface.bulkInsert('associateMotoboys', records, {})
}

async function down(queryInterface) {
  await queryInterface.bulkDelete('associateMotoboys', null, {})
}

module.exports = { up, down }
