const { body, param, query } = require("express-validator");

/**
 * Allowed Categories
 */
const categories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Healthcare",
    "Education",
    "Transportation",
    "Salary",
    "Investment",
    "Others",
];

/**
 * Allowed Payment Methods
 */
const paymentMethods = [
    "Cash",
    "Credit Card",
    "Debit Card",
    "UPI",
    "Net Banking",
    "Wallet",
    "Others",
];

/**
 * Create Expense Validation
 */
const createExpenseValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters"),

    body("amount")
        .notEmpty()
        .withMessage("Amount is required")
        .isFloat({ gt: 0 })
        .withMessage("Amount must be greater than zero"),

    body("category")
        .notEmpty()
        .withMessage("Category is required")
        .isIn(categories)
        .withMessage("Invalid category"),

    body("description")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),

    body("receipt")
        .optional()
        .isString()
        .withMessage("Receipt must be a string"),

    body("paymentMethod")
        .optional()
        .isIn(paymentMethods)
        .withMessage("Invalid payment method"),

    body("date")
        .optional()
        .isISO8601()
        .withMessage("Invalid date"),
];

/**
 * Update Expense Validation
 */
const updateExpenseValidator = [
    body("title")
        .optional()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage("Title must be between 1 and 100 characters"),

    body("amount")
        .optional()
        .isFloat({ gt: 0 })
        .withMessage("Amount must be greater than zero"),

    body("category")
        .optional()
        .isIn(categories)
        .withMessage("Invalid category"),

    body("description")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),

    body("receipt")
        .optional()
        .isString()
        .withMessage("Receipt must be a string"),

    body("paymentMethod")
        .optional()
        .isIn(paymentMethods)
        .withMessage("Invalid payment method"),

    body("date")
        .optional()
        .isISO8601()
        .withMessage("Invalid date"),
];

/**
 * MongoDB ObjectId Validation
 */
const expenseIdValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid Expense ID"),
];

/**
 * Search Validation
 */
const searchExpenseValidator = [
    query("keyword")
        .trim()
        .notEmpty()
        .withMessage("Keyword is required"),
];

/**
 * Pagination Validation
 */
const paginationValidator = [
    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be greater than 0"),

    query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Limit must be between 1 and 100"),
];

module.exports = {
    createExpenseValidator,
    updateExpenseValidator,
    expenseIdValidator,
    searchExpenseValidator,
    paginationValidator,
};