import { useEffect, useState } from "react";
import adminService from "../services/adminService";

const AdminDashboard = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {

        try {

            setLoading(true);

            const response = await adminService.getUsers();

            setUsers(response.data || []);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {

            setDeletingId(id);

            await adminService.deleteUser(id);

            setUsers(prev =>
                prev.filter(user => user._id !== id)
            );

        } catch (error) {

            console.error(error);

        } finally {

            setDeletingId(null);

        }

    };

    if (loading) {

        return (
            <div className="flex justify-center items-center h-96">
                <h2 className="text-2xl font-semibold">
                    Loading Users...
                </h2>
            </div>
        );

    }

    return (

        <div className="max-w-7xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                Admin Dashboard
            </h1>

            {!users.length ? (

                <div className="bg-white rounded-xl shadow-lg p-10 text-center">

                    <h2 className="text-xl font-semibold">
                        No Users Found
                    </h2>

                </div>

            ) : (

                <div className="space-y-4">

                    {users.map(user => (

                        <div
                            key={user._id}
                            className="bg-white rounded-xl shadow-lg p-5 flex justify-between items-center"
                        >

                            <div>

                                <h2 className="font-semibold text-lg">
                                    {user.name}
                                </h2>

                                <p className="text-gray-600">
                                    {user.email}
                                </p>

                                <span
                                    className={`inline-block mt-2 px-3 py-1 rounded text-white text-sm ${
                                        user.role === "admin"
                                            ? "bg-red-500"
                                            : "bg-green-500"
                                    }`}
                                >
                                    {user.role}
                                </span>

                            </div>

                            <button
                                onClick={() =>
                                    handleDelete(user._id)
                                }
                                disabled={
                                    deletingId === user._id
                                }
                                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-4 py-2 rounded transition"
                            >
                                {deletingId === user._id
                                    ? "Deleting..."
                                    : "Delete"}
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

};

export default AdminDashboard;