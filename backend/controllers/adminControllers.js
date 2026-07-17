const adminService = require("../services/adminService");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAllUsers = asyncHandler(async (req, res) => {

    const users = await adminService.getAllUsers();

    return res.status(200).json(
        new ApiResponse(
            200,
            users,
            "Users fetched successfully"
        )
    );
});

const deleteUser = asyncHandler(async (req, res) => {

    await adminService.deleteUser(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "User deleted successfully"
        )
    );
});

module.exports = {
    getAllUsers,
    deleteUser,
};