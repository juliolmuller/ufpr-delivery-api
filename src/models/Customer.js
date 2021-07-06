const { DataTypes, Model } = require('sequelize')

class Customer extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      cnpj: DataTypes.STRING(14),
    }, {
      tableName: 'customers',
      sequelize,
    })
  }

  static associate({ Address, Associate, Order }) {
    this.hasOne(Address, { foreignKey: 'customerId', as: 'address' })
    this.belongsToMany(Associate, { through: 'associateCustomers', foreignKey: 'customerId', as: 'associates' })
    this.hasMany(Order, { foreignKey: 'customerId', as: 'orders' })
  }
}

module.exports = Customer
