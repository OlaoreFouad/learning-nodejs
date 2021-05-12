const Sequelize = require('sequelize')

const sequelize = require('../utils/database')

const Order = sequelize.define('order', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    }
})

module.exports = Order