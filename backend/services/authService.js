const User = require("../models/User");

const generateToken = require("../utils/generateToken");
const ApiError = require("../utils/ApiError");

class AuthService {
    /**
     * Register User
     */
    async register(userData) {
        const { name, email, password } = userData;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw ApiError.conflict("Email already exists");
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        const token = generateToken(user._id);

        return {
            user,
            token,
        };
    }

    /**
     * Login User
     */
    async login(email, password) {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            throw ApiError.unauthorized("Invalid email or password");
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            throw ApiError.unauthorized("Invalid email or password");
        }

        const token = generateToken(user._id);

        user.password = undefined;

        return {
            user,
            token,
        };
    }

    /**
     * Get Logged In User
     */
    async getProfile(userId) {
        const user = await User.findById(userId);

        if (!user) {
            throw ApiError.notFound("User not found");
        }

        return user;
    }

    /**
     * Update Profile
     */
    async updateProfile(userId, updateData) {
        const { name, email, avatar } = updateData;

        const user = await User.findById(userId);

        if (!user) {
            throw ApiError.notFound("User not found");
        }

        if (email && email !== user.email) {
            const emailExists = await User.findOne({
                email,
                _id: { $ne: userId },
            });

            if (emailExists) {
                throw ApiError.conflict("Email already exists");
            }

            user.email = email;
        }

        if (name) {
            user.name = name;
        }

        if (avatar !== undefined) {
            user.avatar = avatar;
        }

        await user.save();

        return user;
    }

    /**
     * Change Password
     */
    async changePassword(
        userId,
        currentPassword,
        newPassword
    ) {
        const user = await User.findById(userId).select("+password");

        if (!user) {
            throw ApiError.notFound("User not found");
        }

        const isPasswordCorrect =
            await user.comparePassword(currentPassword);

        if (!isPasswordCorrect) {
            throw ApiError.badRequest("Current password is incorrect");
        }

        user.password = newPassword;

        await user.save();

        return true;
    }

    /**
     * Delete Account
     */
    async deleteAccount(userId) {
        const user = await User.findById(userId);

        if (!user) {
            throw ApiError.notFound("User not found");
        }

        await User.findByIdAndDelete(userId);

        return true;
    }
}

module.exports = new AuthService();