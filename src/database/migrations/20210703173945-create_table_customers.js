const { DataTypes, fn } = require('sequelize')

async function up(queryInterface) {
  await queryInterface.createTable('customers', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cnpj: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: fn('NOW'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: fn('NOW'),
    },
  })
}

async function down(queryInterface) {
  await queryInterface.dropTable('customers')
}

module.exports = { up, down }
