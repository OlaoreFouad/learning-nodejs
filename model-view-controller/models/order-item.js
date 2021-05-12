const Sequelize = require('sequelize')

const sequelize = require('../utils/database')

const OrderItem = sequelize.define('orderItem', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
    }
})

module.exports = OrderItem