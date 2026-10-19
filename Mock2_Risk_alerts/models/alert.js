const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Alert = sequelize.define(
    "Alert",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        customerName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        riskScore: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "open"
        }
    },
    {
        timestamps: false
    }
);

module.exports = Alert;