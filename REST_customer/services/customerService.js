const Customer = require("../models/customer");

const getCustomerById = async (id) => {
    return Customer.findByPk(id);
};

module.exports = {
    getCustomerById
};