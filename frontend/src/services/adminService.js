import api from "./api";

const adminService = {
    getUsers: async () => {
        const response = await api.get("/admin/users");
        return response.data;
    },

    deleteUser: async (id) => {
        const response = await api.delete(`/admin/users/${id}`);
        return response.data;
    },
};

export default adminService;