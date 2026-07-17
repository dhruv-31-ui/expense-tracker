const express = require("express");

const router = express.Router();

const { getDashboard } = require("../controllers/dashboardController");

const { protect } = require("../middleware/authMiddleware");

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
|
| GET /api/v1/dashboard
|
| Returns:
| - Overview
| - Recent Expenses
| - Category Summary
| - Monthly Summary
|
*/

router.get("/", protect, getDashboard);

module.exports = router;