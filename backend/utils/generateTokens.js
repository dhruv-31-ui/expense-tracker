const jwt = require("jsonwebtoken");
const env = require("../config/env");

/**
 * Generate JWT Access Token
 *
 * @param {String} userId
 * @returns {String}
 */

const generateToken = (userId) => {
    return jwt.sign(
        {
            id: userId,
        },
        env.JWT_SECRET,
        {
            expiresIn: env.JWT_EXPIRE,
        }
    );
};

module.exports = generateToken;