require("dotenv").config();

const http = require("http");

const app = require("./app");
const connectDB = require("./config/db");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 5000;

const startServer = async () => {

    try {

        await connectDB();

        const server = http.createServer(app);

        server.listen(PORT, () => {

            logger.info(
                `🚀 Server running on http://localhost:${PORT}`
            );

        });

        /*
        |--------------------------------------------------------------------------
        | Graceful Shutdown
        |--------------------------------------------------------------------------
        */

        process.on("SIGINT", () => {

            logger.info("SIGINT received. Shutting down server...");

            server.close(() => {

                logger.info("Server closed.");

                process.exit(0);

            });

        });

        process.on("SIGTERM", () => {

            logger.info("SIGTERM received. Shutting down server...");

            server.close(() => {

                logger.info("Server closed.");

                process.exit(0);

            });

        });

    } catch (error) {

        logger.error(`Startup Error: ${error.message}`);

        process.exit(1);

    }

};

/*
|--------------------------------------------------------------------------
| Global Process Error Handling
|--------------------------------------------------------------------------
*/

process.on("uncaughtException", (error) => {

    logger.error(`Uncaught Exception: ${error.stack}`);

    process.exit(1);

});

process.on("unhandledRejection", (reason) => {

    logger.error(`Unhandled Rejection: ${reason}`);

    process.exit(1);

});

startServer();