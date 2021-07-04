const Sequelize = require('sequelize')
const dbConfig = require('./config')
const {
  Associate,
  Customer,
  Address,
  Motoboy,
  Order,
} = require('../models')

const connection = new Sequelize(dbConfig)

Associate.init(connection)
Customer.init(connection)
Address.init(connection)
Motoboy.init(connection)
Order.init(connection)

Associate.associate(connection.models)
Customer.associate(connection.models)
Address.associate(connection.models)
Motoboy.associate(connection.models)
Order.associate(connection.models)

module.exports = connection
