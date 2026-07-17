const dashboardRepository = require("../repositories/dashboardRepository");

class DashboardService {
    async getDashboard(userId) {

        const dashboard =
            await dashboardRepository.getDashboardStats(userId);

        const {
            totalExpense,
            totalIncome,
            todayExpense,
            thisMonthExpense,
            recentExpenses,
            categorySummary,
            monthlySummary,
            totalTransactions,
        } = dashboard;

        const balance =
            totalIncome - totalExpense;

        const averageExpense =
            totalTransactions
                ? Number(
                      (
                          totalExpense /
                          totalTransactions
                      ).toFixed(2)
                  )
                : 0;

        return {

            overview: {

                totalIncome,

                totalExpense,

                balance,

                todayExpense,

                thisMonthExpense,

                averageExpense,

                totalTransactions,

            },

            recentExpenses,

            categorySummary,

            monthlySummary,

            highestExpenseCategory:
                categorySummary.length
                    ? categorySummary[0]
                    : null,

        };

    }
}

module.exports =
    new DashboardService();