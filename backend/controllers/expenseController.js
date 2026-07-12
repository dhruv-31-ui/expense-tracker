const Expense = require("../models/Expense");

// ================= ADD EXPENSE =================

const addExpense = async (req, res) => {

    try {

        const { title, amount, category } = req.body;

        const expense = await Expense.create({

            title,
            amount,
            category,
            user: req.user._id

        });

        return res.status(201).json({

            success: true,
            message: "Expense added successfully",
            data: expense

        });

    } catch (error) {

        if (error.name === "ValidationError") {

            const errors = Object.values(error.errors).map(
                (err) => err.message
            );

            return res.status(400).json({

                success: false,
                errors

            });

        }

        return res.status(500).json({

            success: false,
            message: "Something went wrong"

        });

    }

};

// ================= GET ALL EXPENSES =================

const getExpenses = async (req, res) => {

    try {

        const expenses = await Expense.find({

            user: req.user._id

        }).sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,
            count: expenses.length,
            data: expenses

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: "Something went wrong"

        });

    }

};

// ================= GET EXPENSE BY ID =================

const getExpenseById = async (req, res) => {

    try {

        const { id } = req.params;

        const expense = await Expense.findOne({

            _id: id,
            user: req.user._id

        });

        if (!expense) {

            return res.status(404).json({

                success: false,
                message: "Expense not found"

            });

        }

        return res.status(200).json({

            success: true,
            data: expense

        });

    } catch (error) {

        if (error.name === "CastError") {

            return res.status(400).json({

                success: false,
                message: "Invalid Expense ID"

            });

        }

        return res.status(500).json({

            success: false,
            message: "Something went wrong"

        });

    }

};

// ================= UPDATE EXPENSE =================

const updateExpense = async (req, res) => {

    try {

        const { id } = req.params;

        const expense = await Expense.findOneAndUpdate(

            {

                _id: id,
                user: req.user._id

            },

            req.body,

            {

                new: true,
                runValidators: true

            }

        );

        if (!expense) {

            return res.status(404).json({

                success: false,
                message: "Expense not found"

            });

        }

        return res.status(200).json({

            success: true,
            message: "Expense updated successfully",
            data: expense

        });

    } catch (error) {

        if (error.name === "ValidationError") {

            const errors = Object.values(error.errors).map(
                (err) => err.message
            );

            return res.status(400).json({

                success: false,
                errors

            });

        }

        if (error.name === "CastError") {

            return res.status(400).json({

                success: false,
                message: "Invalid Expense ID"

            });

        }

        return res.status(500).json({

            success: false,
            message: "Something went wrong"

        });

    }

};

// ================= DELETE EXPENSE =================

const deleteExpense = async (req, res) => {

    try {

        const { id } = req.params;

        const expense = await Expense.findOneAndDelete({

            _id: id,
            user: req.user._id

        });

        if (!expense) {

            return res.status(404).json({

                success: false,
                message: "Expense not found"

            });

        }

        return res.status(200).json({

            success: true,
            message: "Expense deleted successfully"

        });

    } catch (error) {

        if (error.name === "CastError") {

            return res.status(400).json({

                success: false,
                message: "Invalid Expense ID"

            });

        }

        return res.status(500).json({

            success: false,
            message: "Something went wrong"

        });

    }

};

module.exports = {

    addExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense

};