const { DataTypes, Model } = require('sequelize')

class Customer extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      cnpj: DataTypes.STRING(14),
    }, { sequelize })
  }

  static associate({ Address, Associate, Order }) {
    this.hasOne(Address, { foreignKey: 'customer_id', as: 'address' })
    this.belongsTo(Associate, { foreignKey: 'associate_id', as: 'associate' })
    this.hasMany(Order, { foreignKey: 'customer_id', as: 'orders' })
  }
}

module.exports = Customer