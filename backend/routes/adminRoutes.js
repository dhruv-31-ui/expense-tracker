const express = require("express");

const router = express.Router();

const {
    getAllUsers,
    deleteUser,
} = require("../controllers/adminControllers");

const {
    protect,
    admin,
} = require("../middleware/authMiddleware");

router.use(protect, admin);

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

module.exports = router;