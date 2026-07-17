const expenseRepository = require("../repositories/expenseRepository");
const ApiError = require("../utils/ApiError");

class ExpenseService {
    /**
     * Create Expense
     */
    async createExpense(expenseData) {
        return await expenseRepository.create(expenseData);
    }

    /**
     * Get Expense By Id
     */
    async getExpenseById(expenseId, userId) {
        const expense = await expenseRepository.findById(expenseId);

        if (!expense) {
            throw ApiError.notFound("Expense not found");
        }

        if (expense.user._id.toString() !== userId.toString()) {
            throw ApiError.forbidden(
                "You are not authorized to access this expense"
            );
        }

        return expense;
    }

    /**
     * Get All Expenses
     */
    async getAllExpenses(userId, queryParams) {
        const {
            page = 1,
            limit = 10,
            category,
            paymentMethod,
            startDate,
            endDate,
            minAmount,
            maxAmount,
            sortBy = "date",
            order = "desc",
        } = queryParams;

        const filters = {};

        if (category) {
            filters.category = category;
        }

        if (paymentMethod) {
            filters.paymentMethod = paymentMethod;
        }

        if (startDate || endDate) {
            filters.date = {};

            if (startDate) {
                filters.date.$gte = new Date(startDate);
            }

            if (endDate) {
                filters.date.$lte = new Date(endDate);
            }
        }

        if (minAmount || maxAmount) {
            filters.amount = {};

            if (minAmount) {
                filters.amount.$gte = Number(minAmount);
            }

            if (maxAmount) {
                filters.amount.$lte = Number(maxAmount);
            }
        }

        return await expenseRepository.findAll(userId, filters, {
            page: Number(page),
            limit: Number(limit),
            sortBy,
            order,
        });
    }

    /**
     * Search Expenses
     */
    async searchExpenses(userId, keyword, options) {
        if (!keyword || keyword.trim() === "") {
            throw ApiError.badRequest("Search keyword is required");
        }

        return await expenseRepository.search(
            userId,
            keyword,
            options
        );
    }

    /**
     * Update Expense
     */
    async updateExpense(expenseId, userId, updateData) {
        await this.getExpenseById(expenseId, userId);

        return await expenseRepository.update(
            expenseId,
            updateData
        );
    }

    /**
     * Delete Expense
     */
    async deleteExpense(expenseId, userId) {
        await this.getExpenseById(expenseId, userId);

        return await expenseRepository.softDelete(expenseId);
    }

    /**
     * Expense Summary
     */
    async getExpenseSummary(userId) {
        const totalExpense =
            await expenseRepository.getTotalExpense(userId);

        const categorySummary =
            await expenseRepository.categorySummary(userId);

        const monthlySummary =
            await expenseRepository.monthlySummary(userId);

        return {
            totalExpense,
            categorySummary,
            monthlySummary,
        };
    }
}

module.exports = new ExpenseService();