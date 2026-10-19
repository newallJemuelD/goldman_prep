const { Op } = require("sequelize");
const Alert = require("../models/alert");


const findAlerts = async ({
    status,
    minScore,
    maxScore
}) => {

    const where = {};

    if (status) {
        where.status = status;
    }

    if (
        minScore !== undefined &&
        maxScore !== undefined
    ) {
        where.riskScore = {
            [Op.gte]: minScore,
            [Op.lte]: maxScore
        };

    }

    return Alert.findAll({
        where
    });
};



const resolveAlert = async (id) => {

    const alert =
        await Alert.findByPk(id);

    if (!alert) {
        throw new Error("ALERT_DO_NOT_EXIST");
    }

    if (alert.status === "resolved") {
        throw new Error("ALREADY_RESOLVED");
    }

    //Update status - fix5
    alert.status = "resolved";
    await alert.save();
    return alert;
};


module.exports = {
    findAlerts,
    resolveAlert
};