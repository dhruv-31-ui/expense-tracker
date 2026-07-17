const authService = require("../services/authService");

const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

/**
 * ---------------------------------------------------------
 * Register User
 * POST /api/v1/auth/register
 * Public
 * ---------------------------------------------------------
 */

const register = asyncHandler(async (req, res) => {
    const { user, token } = await authService.register(req.body);

    return ApiResponse.created(
        res,
        {
            user,
            token,
        },
        "User registered successfully"
    );
});

/**
 * ---------------------------------------------------------
 * Login User
 * POST /api/v1/auth/login
 * Public
 * ---------------------------------------------------------
 */

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const { user, token } = await authService.login(
        email,
        password
    );

    return ApiResponse.success(
        res,
        {
            user,
            token,
        },
        "Login successful"
    );
});

/**
 * ---------------------------------------------------------
 * Get Profile
 * GET /api/v1/auth/profile
 * Private
 * ---------------------------------------------------------
 */

const getProfile = asyncHandler(async (req, res) => {
    const user = await authService.getProfile(req.user.id);

    return ApiResponse.success(
        res,
        user,
        "Profile fetched successfully"
    );
});

/**
 * ---------------------------------------------------------
 * Update Profile
 * PUT /api/v1/auth/profile
 * Private
 * ---------------------------------------------------------
 */

const updateProfile = asyncHandler(async (req, res) => {
    const user = await authService.updateProfile(
        req.user.id,
        req.body
    );

    return ApiResponse.success(
        res,
        user,
        "Profile updated successfully"
    );
});

/**
 * ---------------------------------------------------------
 * Change Password
 * PUT /api/v1/auth/change-password
 * Private
 * ---------------------------------------------------------
 */

const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    await authService.changePassword(
        req.user.id,
        currentPassword,
        newPassword
    );

    return ApiResponse.success(
        res,
        null,
        "Password changed successfully"
    );
});

/**
 * ---------------------------------------------------------
 * Delete Account
 * DELETE /api/v1/auth/profile
 * Private
 * ---------------------------------------------------------
 */

const deleteAccount = asyncHandler(async (req, res) => {
    await authService.deleteAccount(req.user.id);

    return ApiResponse.success(
        res,
        null,
        "Account deleted successfully"
    );
});

module.exports = {
    register,
    login,
    getProfile,
    updateProfile,
    changePassword,
    deleteAccount,
};