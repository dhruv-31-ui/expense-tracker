const Expense = require("../models/Expense");

class DashboardRepository {
    /**
     * Get Dashboard Statistics
     */
    async getDashboardStats(userId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const startOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        const endOfMonth = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0,
            23,
            59,
            59,
            999
        );

        const expenseMatch = {
            user: userId,
            isDeleted: false,
            category: { $ne: "Salary" },
        };

        const incomeMatch = {
            user: userId,
            isDeleted: false,
            category: "Salary",
        };

        const [
            totalExpense,
            totalIncome,
            todayExpense,
            thisMonthExpense,
            recentExpenses,
            categorySummary,
            monthlySummary,
            totalTransactions,
        ] = await Promise.all([
            /**
             * Total Expense
             */
            Expense.aggregate([
                {
                    $match: expenseMatch,
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$amount",
                        },
                    },
                },
            ]),

            /**
             * Total Income
             */
            Expense.aggregate([
                {
                    $match: incomeMatch,
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$amount",
                        },
                    },
                },
            ]),

            /**
             * Today's Expense
             */
            Expense.aggregate([
                {
                    $match: {
                        ...expenseMatch,
                        date: {
                            $gte: today,
                        },
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
            ]),

            /**
             * Current Month Expense
             */
            Expense.aggregate([
                {
                    $match: {
                        ...expenseMatch,
                        date: {
                            $gte: startOfMonth,
                            $lte: endOfMonth,
                        },
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
            ]),

            /**
             * Recent Expenses
             */
            Expense.find({
                user: userId,
                isDeleted: false,
            })
                .select(
                    "title amount category date paymentMethod description"
                )
                .sort({
                    date: -1,
                })
                .limit(5)
                .lean(),

            /**
             * Category Summary
             */
            Expense.aggregate([
                {
                    $match: expenseMatch,
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
            ]),

            /**
             * Monthly Summary
             */
            Expense.aggregate([
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
                        income: {
                            $sum: {
                                $cond: [
                                    {
                                        $eq: [
                                            "$category",
                                            "Salary",
                                        ],
                                    },
                                    "$amount",
                                    0,
                                ],
                            },
                        },
                        expense: {
                            $sum: {
                                $cond: [
                                    {
                                        $ne: [
                                            "$category",
                                            "Salary",
                                        ],
                                    },
                                    "$amount",
                                    0,
                                ],
                            },
                        },
                    },
                },
                {
                    $sort: {
                        "_id.year": 1,
                        "_id.month": 1,
                    },
                },
            ]),

            /**
             * Total Expense Transactions
             */
            Expense.countDocuments(expenseMatch),
        ]);

        return {
            totalExpense: totalExpense[0]?.total || 0,
            totalIncome: totalIncome[0]?.total || 0,
            todayExpense: todayExpense[0]?.total || 0,
            thisMonthExpense: thisMonthExpense[0]?.total || 0,
            totalTransactions,
            recentExpenses,
            categorySummary,
            monthlySummary,
        };
    }
}

module.exports = new DashboardRepository();