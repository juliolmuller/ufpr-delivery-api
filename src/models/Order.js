const { DataTypes, Model } = require('sequelize')

class Order extends Model {
  static init(sequelize) {
    super.init({
      description: DataTypes.TEXT,
      status: DataTypes.STRING(32),
      value: DataTypes.DECIMAL(10, 2),
    }, { sequelize })
  }

  static associate({ Associate, Customer, Motoboy }) {
    this.belongsTo(Associate, { foreignKey: 'associate_id', as: 'associate' })
    this.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' })
    this.belongsTo(Motoboy, { foreignKey: 'motoboy_id', as: 'motoboy' })
  }
}

module.exports = Order
