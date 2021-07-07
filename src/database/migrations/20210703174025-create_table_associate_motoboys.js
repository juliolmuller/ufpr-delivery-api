const { DataTypes, fn } = require('sequelize')

async function up(queryInterface) {
  await queryInterface.createTable('associateMotoboys', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    associateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'associates',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    motoboyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'motoboys',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
  await queryInterface.dropTable('associateMotoboys')
}

module.exports = { up, down }
