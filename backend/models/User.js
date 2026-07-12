const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [30, "Name cannot exceed 30 characters"]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\S+@\S+\.\S+$/,
            "Please enter a valid email"
        ]
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    }

}, {
    timestamps: true
});

// Hash Password Before Saving
userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);

    next();

});

// Compare Password
userSchema.methods.comparePassword = async function (password) {

    return await bcrypt.compare(password, this.password);

};

const User = mongoose.model("User", userSchema);

module.exports = User;