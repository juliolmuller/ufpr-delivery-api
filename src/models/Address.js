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
    }, { sequelize })
  }

  static associate({ Associate, Customer }) {
    this.belongsTo(Associate, { foreignKey: 'associate_id', as: 'associate' })
    this.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' })
  }
}

module.exports = Address
