const { DataTypes, Model } = require('sequelize')

class Motoboy extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      phone: DataTypes.STRING(20),
      cpf: DataTypes.STRING(11),
      password: DataTypes.STRING,
    }, {
      tableName: 'motoboys',
      sequelize,
    })
  }

  static associate({ Associate, Order }) {
    this.belongsToMany(Associate, { through: 'associateMotoboys', foreignKey: 'motoboyId', as: 'associates' })
    this.hasMany(Order, { foreignKey: 'motoboyId', as: 'orders' })
  }
}

module.exports = Motoboy
