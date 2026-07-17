const logger = require("../utils/logger");

/**
 * Global Error Handling Middleware
 */

const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let errors = err.errors || [];

    /*
    |--------------------------------------------------------------------------
    | Mongoose Bad ObjectId
    |--------------------------------------------------------------------------
    */

    if (err.name === "CastError") {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    /*
    |--------------------------------------------------------------------------
    | Mongoose Validation Error
    |--------------------------------------------------------------------------
    */

    if (err.name === "ValidationError") {
        statusCode = 400;

        errors = Object.values(err.errors).map((error) => ({
            field: error.path,
            message: error.message,
        }));

        message = "Validation Failed";
    }

    /*
    |--------------------------------------------------------------------------
    | Duplicate Key Error
    |--------------------------------------------------------------------------
    */

    if (err.code === 11000) {
        statusCode = 409;

        const field = Object.keys(err.keyValue)[0];

        message = `${field} already exists`;
    }

    /*
    |--------------------------------------------------------------------------
    | JWT Errors
    |--------------------------------------------------------------------------
    */

    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid Token";
    }

    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token Expired";
    }

    /*
    |--------------------------------------------------------------------------
    | Logging
    |--------------------------------------------------------------------------
    */

    logger.error(`${req.method} ${req.originalUrl}`);

    logger.error(message);

    if (process.env.NODE_ENV !== "production") {
        logger.error(err.stack);
    }

    /*
    |--------------------------------------------------------------------------
    | Response
    |--------------------------------------------------------------------------
    */

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors,
        ...(process.env.NODE_ENV !== "production" && {
            stack: err.stack,
        }),
        timestamp: new Date().toISOString(),
    });
};

module.exports = errorMiddleware;