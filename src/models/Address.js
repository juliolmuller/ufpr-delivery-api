const { DataTypes, Model } = require('sequelize')

class Address extends Model {
  static init(sequelize) {
    super.init({
      street: DataTypes.STRING,
      number: DataTypes.INTEGER,
      complement: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      cep: DataTypes.STRING(8),
    }, {
      tableName: 'addresses',
      sequelize,
    })
  }

  static associate({ Associate, Customer }) {
    this.belongsTo(Associate, { foreignKey: 'associateId', as: 'associate' })
    this.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' })
  }
}

module.exports = Address
