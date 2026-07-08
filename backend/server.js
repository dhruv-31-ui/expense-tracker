const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Expense Tracker API");
});

app.post("/expenses", (req, res) => {
    console.log(req.body);

    res.send("Expense received");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});