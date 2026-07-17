const analyticsService = require("../services/analyticsService");

const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

/**
 * ---------------------------------------------------------
 * Complete Analytics Dashboard
 * GET /api/v1/analytics
 * Private
 * ---------------------------------------------------------
 */

const getAnalytics = asyncHandler(async (req, res) => {
    const analytics = await analyticsService.getAnalytics(req.user.id);

    return ApiResponse.success(
        res,
        analytics,
        "Analytics fetched successfully"
    );
});

/**
 * ---------------------------------------------------------
 * Category Analytics
 * GET /api/v1/analytics/category
 * Private
 * ---------------------------------------------------------
 */

const getCategoryAnalytics = asyncHandler(async (req, res) => {
    const analytics = await analyticsService.getCategoryAnalytics(
        req.user.id
    );

    return ApiResponse.success(
        res,
        analytics,
        "Category analytics fetched successfully"
    );
});

/**
 * ---------------------------------------------------------
 * Monthly Analytics
 * GET /api/v1/analytics/monthly
 * Private
 * ---------------------------------------------------------
 */

const getMonthlyAnalytics = asyncHandler(async (req, res) => {
    const analytics = await analyticsService.getMonthlyAnalytics(
        req.user.id
    );

    return ApiResponse.success(
        res,
        analytics,
        "Monthly analytics fetched successfully"
    );
});

/**
 * ---------------------------------------------------------
 * Yearly Analytics
 * GET /api/v1/analytics/yearly
 * Private
 * ---------------------------------------------------------
 */

const getYearlyAnalytics = asyncHandler(async (req, res) => {
    const analytics = await analyticsService.getYearlyAnalytics(
        req.user.id
    );

    return ApiResponse.success(
        res,
        analytics,
        "Yearly analytics fetched successfully"
    );
});

/**
 * ---------------------------------------------------------
 * Payment Method Analytics
 * GET /api/v1/analytics/payment-method
 * Private
 * ---------------------------------------------------------
 */

const getPaymentMethodAnalytics = asyncHandler(async (req, res) => {
    const analytics =
        await analyticsService.getPaymentMethodAnalytics(
            req.user.id
        );

    return ApiResponse.success(
        res,
        analytics,
        "Payment method analytics fetched successfully"
    );
});

/**
 * ---------------------------------------------------------
 * Expense Trends
 * GET /api/v1/analytics/trends
 * Private
 * ---------------------------------------------------------
 */

const getExpenseTrend = asyncHandler(async (req, res) => {
    const analytics = await analyticsService.getExpenseTrend(
        req.user.id
    );

    return ApiResponse.success(
        res,
        analytics,
        "Expense trends fetched successfully"
    );
});

module.exports = {
    getAnalytics,
    getCategoryAnalytics,
    getMonthlyAnalytics,
    getYearlyAnalytics,
    getPaymentMethodAnalytics,
    getExpenseTrend,
};