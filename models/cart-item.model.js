const {Sequelize, DataTypes} = require('sequelize')

const sequelize = require('../util/database')

const CartItemModel = sequelize.define('cartItem', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: DataTypes.INTEGER
})

module.exports = CartItemModel