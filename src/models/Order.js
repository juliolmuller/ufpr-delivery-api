const { DataTypes, Model } = require('sequelize')

class Order extends Model {
  static init(sequelize) {
    super.init({
      description: DataTypes.TEXT,
      status: DataTypes.STRING(32),
      value: DataTypes.DECIMAL(10, 2),
    }, {
      tableName: 'orders',
      sequelize,
    })
  }

  static associate({ Associate, Customer, Motoboy }) {
    this.belongsTo(Associate, { foreignKey: 'associateId', as: 'associate' })
    this.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' })
    this.belongsTo(Motoboy, { foreignKey: 'motoboyId', as: 'motoboy' })
  }
}

module.exports = Order
