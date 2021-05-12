const Sequelize = require('sequelize')

const sequelize = require('../utils/database')

const Cart = sequelize.define('cart', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  }
})

module.exports = Cart