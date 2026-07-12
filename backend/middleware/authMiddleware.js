const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {

    try {

        // Get Authorization Header
        const authHeader = req.headers.authorization;

        // Check if Authorization Header Exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });

        }

        // Extract Token
        const token = authHeader.split(" ")[1];

        // Verify Token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Check if User Exists
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "User not found"
            });

        }

        // Attach User to Request
        req.user = user;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });

    }

};

module.exports = authMiddleware;