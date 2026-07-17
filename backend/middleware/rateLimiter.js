const rateLimit = require("express-rate-limit");

/**
 * Global API Rate Limiter
 */

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,

    max: 100,

    standardHeaders: true,

    legacyHeaders: false,

    message: {
        success: false,
        message:
            "Too many requests from this IP. Please try again after 15 minutes.",
    },
});

/**
 * Strict Auth Limiter
 */

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,

    max: 10,

    standardHeaders: true,

    legacyHeaders: false,

    message: {
        success: false,
        message:
            "Too many login attempts. Please try again later.",
    },
});

module.exports = {
    apiLimiter,
    authLimiter,
};