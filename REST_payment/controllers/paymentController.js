const paymentService = require("../services/paymentService");

const createPayment = async (req, res) => {
    try {
        const { accountId, amount, currency} = req.body;

        //account id, currency and amount are required 
        if (
            accountId === undefined ||
            amount === undefined ||
            currency === undefined 
        ) {
            return res.status(400).json({
                error: "accountId, amount and currency are required"
            });
        }

        //amount validation 
        if (amount <= 0) {
            return res.status(400).json({
                error: "amount must be greater than 0"
            });
        }

        //supported currencies validation 
        const supportedCurrencies = ["GBP", "USD", "EUR"];
        if (!supportedCurrencies.includes(currency)) {
            return res.status(400).json({
                error: "Unsupported currency"
            });
        }
        
        const payment = await paymentService.createPayment({
            accountId, 
            amount, 
            currency
        });

        return res.status(201).json(payment);

    } catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

module.exports = {
    createPayment
};