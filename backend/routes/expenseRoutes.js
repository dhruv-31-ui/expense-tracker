const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    addExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
} = require("../controllers/expenseController");

// Protected Routes

router.post("/", authMiddleware, addExpense);

router.get("/", authMiddleware, getExpenses);

router.get("/:id", authMiddleware, getExpenseById);

router.put("/:id", authMiddleware, updateExpense);

router.delete("/:id", authMiddleware, deleteExpense);

module.exports = router;