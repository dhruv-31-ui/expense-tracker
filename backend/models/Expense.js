const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },

        amount: {
            type: Number,
            required: [true, "Amount is required"],
            min: 0,
        },

        category: {
            type: String,
            enum: [
                "Food",
                "Travel",
                "Shopping",
                "Bills",
                "Entertainment",
                "Others",
            ],
            required: true,
        },

        description: {
            type: String,
            default: "",
        },

        receipt: {
            type: String,
            default: "",
        },

        date: {
            type: Date,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Expense",
    expenseSchema
);