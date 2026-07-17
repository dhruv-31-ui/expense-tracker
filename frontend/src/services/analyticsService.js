
import api from "./api";

const analyticsService = {
    getAnalytics: async () => {
        const response = await api.get("/analytics");
        return response.data;
    },

    getCategoryAnalytics: async () => {
        const response = await api.get("/analytics/category");
        return response.data;
    },

    getMonthlyAnalytics: async () => {
        const response = await api.get("/analytics/monthly");
        return response.data;
    },

    getYearlyAnalytics: async () => {
        const response = await api.get("/analytics/yearly");
        return response.data;
    },

    getPaymentMethodAnalytics: async () => {
        const response = await api.get("/analytics/payment-method");
        return response.data;
    },

    getExpenseTrend: async () => {
        const response = await api.get("/analytics/trends");
        return response.data;
    },
};

export default analyticsService;