const Account = require("../models/account");
const Transfer = require("../models/transfer");


const createTransfer = async (
    fromAccountId,
    toAccountId,
    amount
) => {
    const fromAccount =
        await Account.findByPk(fromAccountId);

    const toAccount =
        await Account.findByPk(toAccountId);

    if (!fromAccount) {
        throw new Error("SOURCE_NOT_FOUND");
    }

    if (!toAccount) {
        throw new Error("DESTINATION_NOT_FOUND");
    }

    // BUG: no same-account validation - fix3b
    if (fromAccountId == toAccountId) {
        throw new Error("SAME_ACCOUNTS_DETECTED");
    }

    // BUG: amount validation may be missing - fix4b
    if (amount <= 0) {
        throw new Error("AMOUNT_NOT_VALID");
    }

    // BUG: balance comparison may be wrong - fix5b
    if (fromAccount.balance < amount) {
        throw new Error("INSUFFICIENT_FUNDS");
    }

    fromAccount.balance =
        fromAccount.balance - amount;

    toAccount.balance =
        toAccount.balance + amount;

    // BUG: account changes may not be persisted correctly - fix6
    await fromAccount.save();
    await toAccount.save();

    const transfer = await Transfer.create({
        fromAccountId,
        toAccountId,
        amount,
        status: "completed"
    });

    return transfer;
};

const getTransferById = async (id) => {
    // BUG: incorrect Sequelize method - fix7
    return Transfer.findByPk(id);
};

module.exports = {
    createTransfer,
    getTransferById
};