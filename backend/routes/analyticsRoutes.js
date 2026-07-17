const express = require("express");

const router = express.Router();

const {
    getAnalytics,
    getCategoryAnalytics,
    getMonthlyAnalytics,
    getYearlyAnalytics,
    getPaymentMethodAnalytics,
    getExpenseTrend,
} = require("../controllers/analyticsController");

const { protect } = require("../middleware/authMiddleware");

/*
|--------------------------------------------------------------------------
| Analytics Dashboard
|--------------------------------------------------------------------------
*/

router.get("/", protect, getAnalytics);

/*
|--------------------------------------------------------------------------
| Category Analytics
|--------------------------------------------------------------------------
*/

router.get(
    "/category",
    protect,
    getCategoryAnalytics
);

/*
|--------------------------------------------------------------------------
| Monthly Analytics
|--------------------------------------------------------------------------
*/

router.get(
    "/monthly",
    protect,
    getMonthlyAnalytics
);

/*
|--------------------------------------------------------------------------
| Yearly Analytics
|--------------------------------------------------------------------------
*/

router.get(
    "/yearly",
    protect,
    getYearlyAnalytics
);

/*
|--------------------------------------------------------------------------
| Payment Method Analytics
|--------------------------------------------------------------------------
*/

router.get(
    "/payment-method",
    protect,
    getPaymentMethodAnalytics
);

/*
|--------------------------------------------------------------------------
| Expense Trend
|--------------------------------------------------------------------------
*/

router.get(
    "/trends",
    protect,
    getExpenseTrend
);

module.exports = router;