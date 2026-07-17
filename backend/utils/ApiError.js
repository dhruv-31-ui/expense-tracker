/**
 * Custom API Error Class
 * Used to create consistent application errors.
 */

class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);

        this.success = false;
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.timestamp = new Date().toISOString();

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    /**
     * 400 Bad Request
     */
    static badRequest(message = "Bad Request", errors = []) {
        return new ApiError(400, message, errors);
    }

    /**
     * 401 Unauthorized
     */
    static unauthorized(message = "Unauthorized") {
        return new ApiError(401, message);
    }

    /**
     * 403 Forbidden
     */
    static forbidden(message = "Forbidden") {
        return new ApiError(403, message);
    }

    /**
     * 404 Not Found
     */
    static notFound(message = "Resource Not Found") {
        return new ApiError(404, message);
    }

    /**
     * 409 Conflict
     */
    static conflict(message = "Resource Already Exists") {
        return new ApiError(409, message);
    }

    /**
     * 422 Validation Error
     */
    static validation(message = "Validation Failed", errors = []) {
        return new ApiError(422, message, errors);
    }

    /**
     * 500 Internal Server Error
     */
    static internal(message = "Internal Server Error") {
        return new ApiError(500, message);
    }
}

module.exports = ApiError;