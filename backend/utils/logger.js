const fs = require("fs");
const path = require("path");
const winston = require("winston");
const env = require("../config/env");

// Create logs directory if it doesn't exist
const logDirectory = path.join(__dirname, "../logs");

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const logger = winston.createLogger({
    level: env.NODE_ENV === "production" ? "info" : "debug",

    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.errors({ stack: true }),
        winston.format.printf(
            ({ timestamp, level, message, stack }) => {
                return `[${timestamp}] ${level.toUpperCase()}: ${
                    stack || message
                }`;
            }
        )
    ),

    transports: [
        // Console Logs
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({
                    format: "HH:mm:ss",
                }),
                winston.format.printf(
                    ({ timestamp, level, message }) =>
                        `[${timestamp}] ${level}: ${message}`
                )
            ),
        }),

        // All Logs
        new winston.transports.File({
            filename: path.join(logDirectory, "combined.log"),
        }),

        // Error Logs
        new winston.transports.File({
            filename: path.join(logDirectory, "error.log"),
            level: "error",
        }),
    ],

    exceptionHandlers: [
        new winston.transports.File({
            filename: path.join(logDirectory, "exceptions.log"),
        }),
    ],

    rejectionHandlers: [
        new winston.transports.File({
            filename: path.join(logDirectory, "rejections.log"),
        }),
    ],

    exitOnError: false,
});

module.exports = logger;