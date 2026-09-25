const Expense = require("../models/Expense");

class AnalyticsRepository {
    /**
     * Base Match
     */
    getBaseMatch(userId) {
        return {
            user: userId,
            isDeleted: { $ne: true },
        };
    }

    /**
     * Category Analytics
     */
    async getCategoryAnalytics(userId) {
        return await Expense.aggregate([
            {
                $match: {
                    ...this.getBaseMatch(userId),
                    category: { $ne: "Salary" },
                },
            },
            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: "$amount",
                    },
                    transactions: {
                        $sum: 1,
                    },
                    average: {
                        $avg: "$amount",
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    total: 1,
                    transactions: 1,
                    average: {
                        $round: ["$average", 2],
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
     * Monthly Analytics
     */
    async getMonthlyAnalytics(userId) {
        return await Expense.aggregate([
            {
                $match: this.getBaseMatch(userId),
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                    },
                    income: {
                        $sum: {
                            $cond: [
                                { $eq: ["$category", "Salary"] },
                                "$amount",
                                0,
                            ],
                        },
                    },
                    expense: {
                        $sum: {
                            $cond: [
                                { $ne: ["$category", "Salary"] },
                                "$amount",
                                0,
                            ],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    monthNumber: "$_id.month",
                    month: {
                        $arrayElemAt: [
                            [
                                "",
                                "Jan",
                                "Feb",
                                "Mar",
                                "Apr",
                                "May",
                                "Jun",
                                "Jul",
                                "Aug",
                                "Sep",
                                "Oct",
                                "Nov",
                                "Dec",
                            ],
                            "$_id.month",
                        ],
                    },
                    income: 1,
                    expense: 1,
                },
            },
            {
                $sort: {
                    year: 1,
                    monthNumber: 1,
                },
            },
        ]);
    }

    /**
     * Yearly Analytics
     */
    async getYearlyAnalytics(userId) {
        return await Expense.aggregate([
            {
                $match: this.getBaseMatch(userId),
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                    },
                    income: {
                        $sum: {
                            $cond: [
                                { $eq: ["$category", "Salary"] },
                                "$amount",
                                0,
                            ],
                        },
                    },
                    expense: {
                        $sum: {
                            $cond: [
                                { $ne: ["$category", "Salary"] },
                                "$amount",
                                0,
                            ],
                        },
                    },
                    transactions: {
                        $sum: 1,
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    income: 1,
                    expense: 1,
                    transactions: 1,
                },
            },
            {
                $sort: {
                    year: 1,
                },
            },
        ]);
    }

    /**
     * Payment Method Analytics
     */
    async getPaymentMethodAnalytics(userId) {
        return await Expense.aggregate([
            {
                $match: this.getBaseMatch(userId),
            },
            {
                $group: {
                    _id: "$paymentMethod",
                    total: {
                        $sum: "$amount",
                    },
                    transactions: {
                        $sum: 1,
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    paymentMethod: "$_id",
                    total: 1,
                    transactions: 1,
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
     * Expense Trend (Last 30 Days)
     */
    async getExpenseTrend(userId) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);

        return await Expense.aggregate([
            {
                $match: {
                    ...this.getBaseMatch(userId),
                    date: {
                        $gte: startDate,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        day: { $dayOfMonth: "$date" },
                    },
                    amount: {
                        $sum: "$amount",
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    day: "$_id.day",
                    amount: 1,
                },
            },
            {
                $sort: {
                    year: 1,
                    month: 1,
                    day: 1,
                },
            },
        ]);
    }
}

module.exports = new AnalyticsRepository();
