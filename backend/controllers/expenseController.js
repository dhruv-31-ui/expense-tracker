const Expense = require("../models/Expense");

// Add Expense
const addExpense = async (req, res) => {

    try {

        const expense = await Expense.create(req.body);

        res.status(201).json({
            success: true,
            message: "Expense added successfully",
            data: expense
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });

    }

};

// Get All Expenses
const getExpenses = async (req, res) => {

    try {

        const expenses = await Expense.find();

        res.status(200).json({
            success: true,
            count: expenses.length,
            data: expenses
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });

    }

};

module.exports = {
    addExpense,
    getExpenses
};