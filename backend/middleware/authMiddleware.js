const jwt = require("jsonwebtoken");

const User = require("../models/User");
const env = require("../config/env");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

/**
 * ---------------------------------------------------------
 * Protect Routes
 * ---------------------------------------------------------
 */

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        throw ApiError.unauthorized(
            "Access denied. No token provided."
        );
    }

    let decoded;

    try {
        decoded = jwt.verify(token, env.JWT_SECRET);
    } catch (error) {
        throw ApiError.unauthorized(
            "Invalid or expired token."
        );
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
        throw ApiError.notFound("User not found.");
    }

    req.user = user;

    next();
});

/**
 * ---------------------------------------------------------
 * Admin Middleware
 * ---------------------------------------------------------
 */

const admin = (req, res, next) => {
    if (!req.user) {
        throw ApiError.unauthorized(
            "Authentication required."
        );
    }

    if (req.user.role !== "admin") {
        throw ApiError.forbidden(
            "Access denied. Admin privileges required."
        );
    }

    next();
};

/**
 * ---------------------------------------------------------
 * Role Based Authorization
 * ---------------------------------------------------------
 */

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            throw ApiError.unauthorized(
                "Authentication required."
            );
        }

        if (!roles.includes(req.user.role)) {
            throw ApiError.forbidden(
                "You are not authorized to access this resource."
            );
        }

        next();
    };
};

module.exports = {
    protect,
    admin,
    authorize,
};  