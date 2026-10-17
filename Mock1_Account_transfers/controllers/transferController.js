const transferService = require("../services/transferService");


const createTransfer = async (req, res) => {

    try {

        const {
            fromAccountId,
            toAccountId,
            amount
        } = req.body;


        // Validation is incomplete
        if (!fromAccountId || !toAccountId) {

            return res.status(400).json({
                error: "Missing required fields"
            });

        }


        // BUG: service call may not be handled correctly
        const transfer = transferService.createTransfer(
            fromAccountId,
            toAccountId,
            amount
        );


        return res.status(200).json(transfer);


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


        // More error handling may be required


        return res.status(500).json({
            error: "Internal server error"
        });

    }
};



const getTransfer = async (req, res) => {

    try {

        const transfer =
            await transferService.getTransferById(
                req.params.id
            );


        // BUG: missing-transfer behaviour may be wrong
        if (!transfer) {

            return res.status(200).json({
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