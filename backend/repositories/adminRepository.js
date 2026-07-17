const User = require("../models/User");

const getAllUsers = async () => {
    return await User.find().select("-password");
};

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

module.exports = {
    getAllUsers,
    deleteUser,
};