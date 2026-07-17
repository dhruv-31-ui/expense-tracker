const analyticsRepository = require("../repositories/analyticsRepository");

class AnalyticsService {
    async getAnalytics(userId) {
        const [
            categoryAnalytics,
            monthlyAnalytics,
            yearlyAnalytics,
            paymentMethodAnalytics,
            expenseTrend,
        ] = await Promise.all([
            analyticsRepository.getCategoryAnalytics(userId),
            analyticsRepository.getMonthlyAnalytics(userId),
            analyticsRepository.getYearlyAnalytics(userId),
            analyticsRepository.getPaymentMethodAnalytics(userId),
            analyticsRepository.getExpenseTrend(userId),
        ]);

        return {
            overview: {
                totalCategories: categoryAnalytics.length,
                totalPaymentMethods: paymentMethodAnalytics.length,
                totalMonths: monthlyAnalytics.length,
                totalYears: yearlyAnalytics.length,
            },
            categoryAnalytics,
            monthlyAnalytics,
            yearlyAnalytics,
            paymentMethodAnalytics,
            expenseTrend,
        };
    }

    getCategoryAnalytics(userId) {
        return analyticsRepository.getCategoryAnalytics(userId);
    }

    getMonthlyAnalytics(userId) {
        return analyticsRepository.getMonthlyAnalytics(userId);
    }

    getYearlyAnalytics(userId) {
        return analyticsRepository.getYearlyAnalytics(userId);
    }

    getPaymentMethodAnalytics(userId) {
        return analyticsRepository.getPaymentMethodAnalytics(userId);
    }

    getExpenseTrend(userId) {
        return analyticsRepository.getExpenseTrend(userId);
    }
}

module.exports = new AnalyticsService();