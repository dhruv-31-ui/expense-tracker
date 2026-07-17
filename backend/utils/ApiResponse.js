/**
 * Standard API Response Class
 * Used to send consistent success responses throughout the application.
 */

class ApiResponse {
    constructor(
        statusCode,
        data = null,
        message = "Success",
        meta = {}
    ) {
        this.success = statusCode >= 200 && statusCode < 400;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.meta = meta;
        this.timestamp = new Date().toISOString();
    }

    /**
     * Send response
     */
    send(res) {
        return res.status(this.statusCode).json({
            success: this.success,
            statusCode: this.statusCode,
            message: this.message,
            data: this.data,
            meta: this.meta,
            timestamp: this.timestamp,
        });
    }

    /**
     * Success Response
     */
    static success(
        res,
        data = null,
        message = "Success",
        statusCode = 200,
        meta = {}
    ) {
        return new ApiResponse(
            statusCode,
            data,
            message,
            meta
        ).send(res);
    }

    /**
     * Created Response
     */
    static created(
        res,
        data = null,
        message = "Resource created successfully"
    ) {
        return new ApiResponse(
            201,
            data,
            message
        ).send(res);
    }

    /**
     * No Content Response
     */
    static noContent(res) {
        return res.status(204).send();
    }
}

module.exports = ApiResponse;