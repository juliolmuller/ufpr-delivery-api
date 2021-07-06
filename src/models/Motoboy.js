const { DataTypes, Model } = require('sequelize')

class Motoboy extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      phone: DataTypes.STRING(20),
      cpf: DataTypes.STRING(11),
      password: DataTypes.STRING,
    }, { sequelize })
  }

  static associate({ Associate, Order }) {
    this.belongsToMany(Associate, { foreignKey: 'associate_id', through: 'associate_motoboys', as: 'associate' })
    this.hasMany(Order, { foreignKey: 'motoboy_id', as: 'orders' })
  }
}

module.exports = Motoboy
