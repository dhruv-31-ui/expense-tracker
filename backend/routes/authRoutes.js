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
} = require("../validators/authValidators");

router.post(
    "/register",
    registerValidator,
    validate,
    register
);

router.post(
    "/login",
    loginValidator,
    validate,
    login
);

router.get("/profile", protect, getProfile);

router.put(
    "/profile",
    protect,
    updateProfileValidator,
    validate,
    updateProfile
);

router.put(
    "/change-password",
    protect,
    changePasswordValidator,
    validate,
    changePassword
);

router.delete("/profile", protect, deleteAccount);

module.exports = router;