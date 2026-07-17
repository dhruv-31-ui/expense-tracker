const Expense = require("../models/Expense");

class ExpenseRepository {
    /**
     * Create Expense
     */
    async create(expenseData) {
        return await Expense.create(expenseData);
    }

    /**
     * Get Expense By ID
     */
    async findById(expenseId) {
        return await Expense.findOne({
            _id: expenseId,
            isDeleted: false,
        }).populate("user", "name email");
    }

    /**
     * Get User Expenses
     */
    async findAll(userId, filters = {}, options = {}) {
        const {
            page = 1,
            limit = 10,
            sortBy = "date",
            order = "desc",
        } = options;

        const query = {
            user: userId,
            isDeleted: false,
            ...filters,
        };

        const skip = (page - 1) * limit;

        const sort = {
            [sortBy]: order === "asc" ? 1 : -1,
        };

        const expenses = await Expense.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Expense.countDocuments(query);

        return {
            expenses,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    /**
     * Search Expenses
     */
    async search(userId, keyword, options = {}) {
        const {
            page = 1,
            limit = 10,
        } = options;

        const skip = (page - 1) * limit;

        const query = {
            user: userId,
            isDeleted: false,
            $text: {
                $search: keyword,
            },
        };

        const expenses = await Expense.find(query)
            .skip(skip)
            .limit(limit)
            .sort({
                score: {
                    $meta: "textScore",
                },
            })
            .select({
                score: {
                    $meta: "textScore",
                },
            });

        const total = await Expense.countDocuments(query);

        return {
            expenses,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    /**
     * Update Expense
     */
    async update(expenseId, updateData) {
        return await Expense.findOneAndUpdate(
            {
                _id: expenseId,
                isDeleted: false,
            },
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );
    }

    /**
     * Soft Delete Expense
     */
    async softDelete(expenseId) {
        return await Expense.findByIdAndUpdate(
            expenseId,
            {
                isDeleted: true,
            },
            {
                new: true,
            }
        );
    }

    /**
     * Get Total Expense Amount
     */
    async getTotalExpense(userId) {
        const result = await Expense.aggregate([
            {
                $match: {
                    user: userId,
                    isDeleted: false,
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount",
                    },
                },
            },
        ]);

        return result.length ? result[0].total : 0;
    }

    /**
     * Category Wise Expense
     */
    async categorySummary(userId) {
        return await Expense.aggregate([
            {
                $match: {
                    user: userId,
                    isDeleted: false,
                },
            },
            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: "$amount",
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    total: -1,
                },
            },
        ]);
    }

    /**
     * Monthly Expense Summary
     */
    async monthlySummary(userId) {
        return await Expense.aggregate([
            {
                $match: {
                    user: userId,
                    isDeleted: false,
                },
            },
            {
                $group: {
                    _id: {
                        year: {
                            $year: "$date",
                        },
                        month: {
                            $month: "$date",
                        },
                    },
                    total: {
                        $sum: "$amount",
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    "_id.year": -1,
                    "_id.month": -1,
                },
            },
        ]);
    }
}

module.exports = new ExpenseRepository();