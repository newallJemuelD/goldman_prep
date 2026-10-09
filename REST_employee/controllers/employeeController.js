const { Op } = require("sequelize");
const Employee = require("../models/Employee");

const getEmployees = async (req, res) => {
    try {
        const { 
            department, 
            minSalary,
            maxSalary
        } = req.query;

        const where = {};

        // If only one salary is provided 
        if (
            (minSalary !== undefined && maxSalary === undefined) ||
            (minSalary === undefined && maxSalary !== undefined)
        ) {
            return res.status(400).json({
                error: "Both minSalary and maxSalary are required"
            })
        }

        // If both salary are provided, validate range 
        if (
            minSalary !== undefined &&
            maxSalary !== undefined && 
            Number(minSalary) > Number(maxSalary)
        ) {
            return res.status(400).json({
                error: "minSalary cannot be greater than maxSalary"
            })
        }

        // Department filter 
        if (department !== undefined) {
            where.department = department;
        }

        // Salary filter 
        if (
            minSalary !== undefined && 
            maxSalary !== undefined 
        ) {
            where.salary = {
                [Op.gte]: Number(minSalary),
                [Op.lte]: Number(maxSalary)
            }
        }

        const employees = await Employee.findAll({
            where: where
        });

        return res.status(200).json(employees);

    } catch (error) {
        return res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {
    getEmployees
};