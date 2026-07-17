import api from "./api";

const expenseService = {
    // Get all expenses
    getExpenses: async (params = {}) => {
        const response = await api.get("/expenses", { params });
        return response.data;
    },

    // Get single expense
    getExpenseById: async (id) => {
        const response = await api.get(`/expenses/${id}`);
        return response.data;
    },

    // Create expense
    createExpense: async (expenseData) => {
        const response = await api.post("/expenses", expenseData);
        return response.data;
    },

    // Update expense
    updateExpense: async (id, expenseData) => {
        const response = await api.put(`/expenses/${id}`, expenseData);
        return response.data;
    },

    // Delete expense
    deleteExpense: async (id) => {
        const response = await api.delete(`/expenses/${id}`);
        return response.data;
    },

    // Summary
    getSummary: async () => {
        const response = await api.get("/expenses/summary");
        return response.data;
    },
};

export default expenseService;