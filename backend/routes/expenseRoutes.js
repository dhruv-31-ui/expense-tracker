const express = require("express");

const router = express.Router();

const {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    searchExpenses,
    getExpenseSummary,
} = require("../controllers/expenseController");

const protect = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");

const {
    createExpenseValidator,
    updateExpenseValidator,
    expenseIdValidator,
    searchExpenseValidator,
    paginationValidator,
} = require("../validators/expenseValidator");

/**
 * ---------------------------------------------------------
 * Summary Routes
 * ---------------------------------------------------------
 */

router.get(
    "/summary",
    protect,
    getExpenseSummary
);

/**
 * ---------------------------------------------------------
 * Search Route
 * ---------------------------------------------------------
 */

router.get(
    "/search",
    protect,
    searchExpenseValidator,
    paginationValidator,
    validate,
    searchExpenses
);

/**
 * ---------------------------------------------------------
 * Expense CRUD Routes
 * ---------------------------------------------------------
 */

// Create Expense
router.post(
    "/",
    protect,
    createExpenseValidator,
    validate,
    createExpense
);

// Get All Expenses
router.get(
    "/",
    protect,
    paginationValidator,
    validate,
    getAllExpenses
);

// Get Expense By Id
router.get(
    "/:id",
    protect,
    expenseIdValidator,
    validate,
    getExpenseById
);

// Update Expense
router.put(
    "/:id",
    protect,
    expenseIdValidator,
    updateExpenseValidator,
    validate,
    updateExpense
);

// Delete Expense
router.delete(
    "/:id",
    protect,
    expenseIdValidator,
    validate,
    deleteExpense
);

module.exports = router;