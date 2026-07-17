// src/config/db.js

const mongoose = require("mongoose");
const env = require("./env");
const logger = require("../utils/logger");

/**
 * Connect to MongoDB
 */
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(env.MONGO_URI);

        logger.info("----------------------------------------");
        logger.info("MongoDB Connected Successfully");
        logger.info(`Database : ${connection.connection.name}`);
        logger.info(`Host     : ${connection.connection.host}`);
        logger.info("----------------------------------------");

        return connection;
    } catch (error) {
        logger.error("----------------------------------------");
        logger.error("MongoDB Connection Failed");
        logger.error(error.message);
        logger.error("----------------------------------------");

        process.exit(1);
    }
};

module.exports = connectDB;