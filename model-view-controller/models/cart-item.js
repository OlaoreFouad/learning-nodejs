const Sequelize = require('sequelize')

const sequelize = require('../utils/database')

const CartItem = sequelize.define('cartItem', {
    id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
})

module.exports = CartItem