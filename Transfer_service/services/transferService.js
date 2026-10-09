const Transfer = require("../models/transfer");
const accountService = require("./accountService");

const createTransfer = async ({ fromAccount, toAccount, amount }) => {

    if (amount <= 0) {
        const error = new Error("Invalid amount");
        error.statusCode = 400;
        throw error;
    }

    if (fromAccount === toAccount) {
        const error = new Error("Source and destination accounts must be different");
        error.statusCode = 400;
        throw error;
    }

    const sender = await accountService.getAccountById(fromAccount);

    if (!sender) {
        const error = new Error("Source account not found");
        error.statusCode = 404;
        throw error;
    }

    const receiver = await accountService.getAccountById(toAccount);

    if (!receiver) {
        const error = new Error("Destination account not found");
        error.statusCode = 404;
        throw error;
    }

    if (sender.balance < amount) {
        const error = new Error("Insufficient balance");
        error.statusCode = 409;
        throw error;
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    const transfer = await Transfer.create({
        fromAccount,
        toAccount,
        amount,
        status: "completed"
    });

    return transfer;
};

module.exports = {
    createTransfer
};