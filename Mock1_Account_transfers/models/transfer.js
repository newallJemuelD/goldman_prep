const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Transfer = sequelize.define("Transfer", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    fromAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    toAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

module.exports = Transfer;