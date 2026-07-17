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

const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");

const {
    createExpenseValidator,
    updateExpenseValidator,
    expenseIdValidator,
    searchExpenseValidator,
    paginationValidator,
} = require("../validators/expenseValidator");

router.get("/summary", protect, getExpenseSummary);

router.get(
    "/search",
    protect,
    searchExpenseValidator,
    paginationValidator,
    validate,
    searchExpenses
);

router.post(
    "/",
    protect,
    createExpenseValidator,
    validate,
    createExpense
);

router.get(
    "/",
    protect,
    paginationValidator,
    validate,
    getAllExpenses
);

router.get(
    "/:id",
    protect,
    expenseIdValidator,
    validate,
    getExpenseById
);

router.put(
    "/:id",
    protect,
    expenseIdValidator,
    updateExpenseValidator,
    validate,
    updateExpense
);

router.delete(
    "/:id",
    protect,
    expenseIdValidator,
    validate,
    deleteExpense
);

module.exports = router;