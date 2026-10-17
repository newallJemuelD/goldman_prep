const Account = require("../models/account");
const Transfer = require("../models/transfer");


const createTransfer = async (
    fromAccountId,
    toAccountId,
    amount
) => {

    const fromAccount =
        await Account.findByPk(fromAccountId);


    if (!fromAccount) {
        throw new Error("SOURCE_NOT_FOUND");
    }


    const toAccount =
        await Account.findByPk(toAccountId);


    if (!toAccount) {
        throw new Error("DESTINATION_NOT_FOUND");
    }


    // BUG: no same-account validation


    // BUG: amount validation may be missing


    // BUG: balance comparison may be wrong

    if (fromAccount.balance <= amount) {
        throw new Error("INSUFFICIENT_FUNDS");
    }


    fromAccount.balance =
        fromAccount.balance - amount;


    toAccount.balance =
        toAccount.balance + amount;


    // BUG: account changes may not be persisted correctly

    fromAccount.save();
    toAccount.save();


    const transfer = await Transfer.create({

        fromAccountId,

        toAccountId,

        amount,

        status: "completed"

    });


    return transfer;
};



const getTransferById = async (id) => {

    // BUG: incorrect Sequelize method
    return Transfer.findAll({
        where: {
            id
        }
    });

};



module.exports = {
    createTransfer,
    getTransferById
};