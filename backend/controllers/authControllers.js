const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (userId) => {

    return jwt.sign(

        {
            userId
        },

        process.env.JWT_SECRET,

        {
            expiresIn: "7d"
        }

    );

};

// ================= REGISTER =================

const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Check Existing User
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(409).json({

                success: false,
                message: "Email already exists"

            });

        }

        // Create User
        const user = await User.create({

            name,
            email,
            password

        });

        // Generate Token
        const token = generateToken(user._id);

        return res.status(201).json({

            success: true,
            message: "User registered successfully",

            token,

            user: {

                id: user._id,
                name: user.name,
                email: user.email

            }

        });

    } catch (error) {

        // Validation Error
        if (error.name === "ValidationError") {

            const errors = Object.values(error.errors).map(

                (err) => err.message

            );

            return res.status(400).json({

                success: false,
                errors

            });

        }

        return res.status(500).json({

            success: false,
            message: "Something went wrong"

        });

    }

};

// ================= LOGIN =================

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(401).json({

                success: false,
                message: "Invalid Credentials"

            });

        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {

            return res.status(401).json({

                success: false,
                message: "Invalid Credentials"

            });

        }

        const token = generateToken(user._id);

        return res.status(200).json({

            success: true,

            message: "Login successful",

            token,

            user: {

                id: user._id,
                name: user.name,
                email: user.email

            }

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: "Something went wrong"

        });

    }

};

module.exports = {

    register,
    login

};