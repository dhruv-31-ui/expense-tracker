const express = require("express");

const router = express.Router();

const {
    getAllUsers,
    deleteUser,
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");

// If you have admin middleware, import it here
// const adminMiddleware = require("../middleware/adminMiddleware");

router.use(authMiddleware);
// router.use(adminMiddleware);

router.get("/users", getAllUsers);

router.delete("/users/:id", deleteUser);

module.exports = router;