const adminRepository = require("../repositories/adminRepository");
const ApiError = require("../utils/ApiError");

const getAllUsers = async () => {
    return await adminRepository.getAllUsers();
};

const deleteUser = async (id) => {
    const user = await adminRepository.deleteUser(id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
};

module.exports = {
    getAllUsers,
    deleteUser,
};