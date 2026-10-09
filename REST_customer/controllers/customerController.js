const customerService = require("../services/customerService");

const getCustomer = async (req, res) => {
    try {
        const customer = await customerService.getCustomerById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                error: "Customer not found"
            });
        }

        return res.status(200).json(customer);

    } catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

module.exports = {
    getCustomer
};