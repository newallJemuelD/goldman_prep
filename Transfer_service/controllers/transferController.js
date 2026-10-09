const transferService = require("../services/transferService");

const createTransfer = async (req, res) => {
    try {
        const {
            fromAccount,
            toAccount,
            amount
        } = req.body;

        const transfer = await transferService.createTransfer({
            fromAccount,
            toAccount,
            amount
        });

        return res.status(201).json(transfer);

    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({
                error: error.message
            });
        }

        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

module.exports = {
    createTransfer
};