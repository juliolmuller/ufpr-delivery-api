const { faker, passwordUtils } = require('../../utils')

function makeAssociate(cnpj) {
  const name = faker.company.companyName()
  const password = passwordUtils.hash('qwerty123')
  const createdAt = faker.date.past(2)
  const updatedAt = faker.date.between(createdAt, new Date())
  return {
    name,
    cnpj,
    password,
    createdAt,
    updatedAt,
  }
}

async function up(queryInterface) {
  const cnpj = ['26895494000103','22037445000189','35104887000142','71854596000135','11789997000127']
  const associates =  cnpj.map(e=>makeAssociate(e))

  await queryInterface.bulkInsert('associates', associates, {})
}

async function down(queryInterface) {
  await queryInterface.bulkDelete('associates', null, {})
}

module.exports = { up, down }
