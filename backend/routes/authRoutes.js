const express = require("express");

const router = express.Router();

const {
    register,
    login,
    getProfile,
    updateProfile,
    changePassword,
    deleteAccount,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const validate = require("../middleware/validateMiddleware");

const {
    registerValidator,
    loginValidator,
    updateProfileValidator,
    changePasswordValidator,
} = require("../validators/authValidator");

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Register User
router.post(
    "/register",
    registerValidator,
    validate,
    register
);

// Login User
router.post(
    "/login",
    loginValidator,
    validate,
    login
);

/*
|--------------------------------------------------------------------------
| Private Routes
|--------------------------------------------------------------------------
*/

// Get Logged In User
router.get(
    "/profile",
    protect,
    getProfile
);

// Update Profile
router.put(
    "/profile",
    protect,
    updateProfileValidator,
    validate,
    updateProfile
);

// Change Password
router.put(
    "/change-password",
    protect,
    changePasswordValidator,
    validate,
    changePassword
);

// Delete Account
router.delete(
    "/profile",
    protect,
    deleteAccount
);

module.exports = router;