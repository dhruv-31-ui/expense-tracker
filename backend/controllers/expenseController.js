const expenseService = require("../services/expenseService");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

/**
 * @desc    Create Expense
 * @route   POST /api/v1/expenses
 * @access  Private
 */
const createExpense = asyncHandler(async (req, res) => {
    const expense = await expenseService.createExpense({
        ...req.body,
        user: req.user.id,
    });

    return ApiResponse.created(
        res,
        expense,
        "Expense created successfully"
    );
});

/**
 * @desc    Get All Expenses
 * @route   GET /api/v1/expenses
 * @access  Private
 */
const getAllExpenses = asyncHandler(async (req, res) => {
    const expenses = await expenseService.getAllExpenses(
        req.user.id,
        req.query
    );

    return ApiResponse.success(
        res,
        expenses,
        "Expenses fetched successfully"
    );
});

/**
 * @desc    Get Expense By Id
 * @route   GET /api/v1/expenses/:id
 * @access  Private
 */
const getExpenseById = asyncHandler(async (req, res) => {
    const expense = await expenseService.getExpenseById(
        req.params.id,
        req.user.id
    );

    return ApiResponse.success(
        res,
        expense,
        "Expense fetched successfully"
    );
});

/**
 * @desc    Update Expense
 * @route   PUT /api/v1/expenses/:id
 * @access  Private
 */
const updateExpense = asyncHandler(async (req, res) => {
    const expense = await expenseService.updateExpense(
        req.params.id,
        req.user.id,
        req.body
    );

    return ApiResponse.success(
        res,
        expense,
        "Expense updated successfully"
    );
});

/**
 * @desc    Delete Expense
 * @route   DELETE /api/v1/expenses/:id
 * @access  Private
 */
const deleteExpense = asyncHandler(async (req, res) => {
    await expenseService.deleteExpense(
        req.params.id,
        req.user.id
    );

    return ApiResponse.success(
        res,
        null,
        "Expense deleted successfully"
    );
});

/**
 * @desc    Search Expenses
 * @route   GET /api/v1/expenses/search
 * @access  Private
 */
const searchExpenses = asyncHandler(async (req, res) => {
    const { keyword, page, limit } = req.query;

    const expenses = await expenseService.searchExpenses(
        req.user.id,
        keyword,
        {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
        }
    );

    return ApiResponse.success(
        res,
        expenses,
        "Expenses fetched successfully"
    );
});

/**
 * @desc    Expense Summary
 * @route   GET /api/v1/expenses/summary
 * @access  Private
 */
const getExpenseSummary = asyncHandler(async (req, res) => {
    const summary = await expenseService.getExpenseSummary(
        req.user.id
    );

    return ApiResponse.success(
        res,
        summary,
        "Expense summary fetched successfully"
    );
});

module.exports = {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    searchExpenses,
    getExpenseSummary,
};