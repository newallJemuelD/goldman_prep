const transferService = require("../services/transferService");

const createTransfer = async (req, res) => {
    try {
        const {
            fromAccountId,
            toAccountId,
            amount
        } = req.body;

        // Required fields validation  - fix1 
        if (
            fromAccountId === undefined ||
            toAccountId === undefined ||
            amount === undefined
        ) {
            return res.status(400).json({
                error: "Missing required fields"
            });
        }

        // User creation - fix2
        const transfer = await transferService.createTransfer(
            fromAccountId,
            toAccountId,
            amount
        );
        return res.status(201).json(transfer);

    } catch (error) {

        if (error.message === "SOURCE_NOT_FOUND") {
            return res.status(404).json({
                error: "Source account not found"
            });
        }

        if (error.message === "DESTINATION_NOT_FOUND") {
            return res.status(404).json({
                error: "Destination account not found"
            });
        }

        // Source and destination accounts check - fix3a
        if (error.message === "SAME_ACCOUNTS_DETECTED") {
            return res.status(400).json({
                error: "Ensure source and destination accounts are different"
            });
        }

        // Ensure amount is greater than zero - fix4a
        if (error.message === "AMOUNT_NOT_VALID") {
            return res.status(400).json({
                error: "Ensure amount is greater than 0"
            });
        }

        // Ensure source account has sufficient funds - fix5a
        if (error.message === "INSUFFICIENT_FUNDS") {
            return res.status(409).json({
                error: "Insufficient funds on source account"
            });
        }

        return res.status(500).json({
            error: "Unexpected internal server error"
        });
    }
};

const getTransfer = async (req, res) => {
    try {
        const transfer =
            await transferService.getTransferById(
                req.params.id
            );
        // BUG: missing-transfer behaviour may be wrong - fix8
        if (!transfer) {
            return res.status(404).json({
                error: "Transfer not found"
            });
        }
        return res.status(200).json(transfer);

    } catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

module.exports = {
    createTransfer,
    getTransfer
};