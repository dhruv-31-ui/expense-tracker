const express = require("express");
const connectDB = require("./config/database");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/expenses", expenseRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Expense Tracker API is Running...");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});