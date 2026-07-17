const dashboardService = require("../services/dashboardService");

const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

/**
 * ---------------------------------------------------------
 * Dashboard
 * GET /api/v1/dashboard
 * Private
 * ---------------------------------------------------------
 */

const getDashboard = asyncHandler(async (req, res) => {
    const dashboard = await dashboardService.getDashboard(
        req.user.id
    );

    return ApiResponse.success(
        res,
        dashboard,
        "Dashboard fetched successfully"
    );
});

module.exports = {
    getDashboard,
};