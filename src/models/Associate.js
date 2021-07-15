const { DataTypes, Model } = require('sequelize')

class Associate extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      cnpj: DataTypes.STRING(14),
      password: DataTypes.STRING,
    }, {
      tableName: 'associates',
      sequelize,
    })
  }

  static associate({ Address, Customer, Motoboy, Order }) {
    this.hasOne(Address, { foreignKey: 'associateId', as: 'address' })
    this.belongsToMany(Customer, { through: 'associateCustomers', foreignKey: 'associateId', as: 'customers' })
    this.belongsToMany(Motoboy, { through: 'associateMotoboys', foreignKey: 'associateId', as: 'motoboys' })
    this.hasMany(Order, { foreignKey: 'associateId', as: 'orders', onDelete: 'cascade' })
  }
}

module.exports = Associate
