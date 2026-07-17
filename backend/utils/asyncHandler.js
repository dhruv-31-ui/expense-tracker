/**
 * Async Handler
 *
 * Wraps async route handlers and forwards any errors
 * to Express error-handling middleware.
 *
 * Usage:
 * router.get("/", asyncHandler(controller.getAllExpenses));
 */

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch(next);
    };
};

module.exports = asyncHandler;