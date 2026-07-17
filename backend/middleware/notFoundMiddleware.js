// middleware/notFoundMiddleware.js

const ApiError = require("../utils/ApiError");

/**
 * 404 Not Found Middleware
 *
 * This middleware is executed when no route matches
 * the incoming request.
 */

const notFoundMiddleware = (req, res, next) => {
    next(
        ApiError.notFound(
            `Cannot ${req.method} ${req.originalUrl}`
        )
    );
};

module.exports = notFoundMiddleware;