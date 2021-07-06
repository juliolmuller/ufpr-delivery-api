const { DataTypes, fn } = require('sequelize')

async function up(queryInterface) {
  await queryInterface.createTable('addresses', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    associateId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'associates',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'customers',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    complement: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cep: {
      type: DataTypes.STRING(8),
      allowNull: true,
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
  await queryInterface.dropTable('addresses')
}

module.exports = { up, down }
