const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Payment = sequelize.define("Payment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    accountId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    currency: {
        type: DataTypes.STRING,
        allowNull: false
    },

    status: {
        type: DataTypes.STRING,
        defaultValue: "created"
    }
});

module.exports = Payment;