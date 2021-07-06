const { DataTypes, Model } = require('sequelize')

class Associate extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      cnpj: DataTypes.STRING(14),
      password: DataTypes.STRING,
    }, { sequelize })
  }

  static associate({ Address, Customer, Motoboy, Order }) {
    this.hasOne(Address, { foreignKey: 'associate_id', as: 'address' })
    this.belongsToMany(Customer, { foreignKey: 'associate_id', through: 'associate_customers', as: 'customers' })
    this.belongsToMany(Motoboy, { foreignKey: 'associate_id', through: 'associate_motoboys', as: 'motoboys' })
    this.hasMany(Order, { foreignKey: 'associate_id', as: 'orders' })
  }
}

module.exports = Associate
