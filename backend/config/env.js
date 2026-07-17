const dotenv = require("dotenv");

dotenv.config();

const requiredEnv = [
    "PORT",
    "NODE_ENV",
    "MONGO_URI",
    "JWT_SECRET",
    "JWT_EXPIRE",
];

requiredEnv.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(
            `Missing required environment variable: ${key}`
        );
    }
});

const env = Object.freeze({
    PORT: Number(process.env.PORT),
    NODE_ENV: process.env.NODE_ENV,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
});

module.exports = env;