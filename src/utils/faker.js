const faker = require('faker')
const cpfUtils = require('cpf-utils')
const cnpjUtils = require('cnpj-utils')

// Configurar Faker.js para forçar dados em "pt_BR".
faker.locale = 'pt_BR'
faker.cpf = (format = false) => cpfUtils.generate({ format })
faker.cnpj = (format = false) => cnpjUtils.generate({ format })

module.exports = faker
