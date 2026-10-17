const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Account = sequelize.define("Account", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    balance: {
        type: DataTypes.FLOAT,
        allowNull: false
    }

});

module.exports = Account;