const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minlength: [3, "Title must be at least 3 characters"],
        maxlength: [50, "Title cannot exceed 50 characters"]
    },

    amount: {
        type: Number,
        required: [true, "Amount is required"],
        min: [0, "Amount cannot be negative"]
    },

    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true,
        enum: [
            "Food",
            "Travel",
            "Shopping",
            "Bills",
            "Entertainment",
            "Health",
            "Education",
            "Other"
        ]
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, {
    timestamps: true
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;