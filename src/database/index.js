const Sequelize = require('sequelize')
const dbConfig = require('./config')

const connection = new Sequelize(dbConfig)
// const Model = require('../models/Model')

// Model.init(connection)
// Model.associate(connection.models)

module.exports = connection
