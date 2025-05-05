const Employee = require('../models/employeeModel');

// Get all employees
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new employee
const createEmployee = async (req, res) => {
    try {
        const { name, email, position, employeeType } = req.body;
        const profilePic = req.file ? req.file.path : '';

        const employee = await Employee.create({
            name,
            email,
            position,
            employeeType,
            profilePic
        });

        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get employee by ID
const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update employee
const updateEmployee = async (req, res) => {
    try {
        const { name, email, position, employeeType } = req.body;
        const updateData = {
            name,
            email,
            position,
            employeeType
        };

        if (req.file) {
            updateData.profilePic = req.file.path;
        }

        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete employee
const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};