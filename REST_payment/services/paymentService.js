const Payment = require("../models/payment");

const createPayment = async ({ accountId, amount, currency}) => {
    const payment = await Payment.create({
        accountId, 
        amount, 
        currency, 
        status: "created"
    });

    return payment;
}

module.exports = {
    createPayment
};