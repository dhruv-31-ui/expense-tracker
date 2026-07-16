import { useEffect, useState } from "react";
import api from "../services/api";

const AdminDashboard = () => {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        try {

            const response = await api.get("/admin/users");

            setUsers(response.data.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete User?")) return;

        try {

            await api.delete(`/admin/users/${id}`);

            setUsers(prev =>
                prev.filter(user => user._id !== id)
            );

        } catch (error) {

            console.error(error);

        }

    };

    if (loading)
        return <h2>Loading...</h2>;

    return (

        <div className="max-w-7xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                Admin Dashboard
            </h1>

            <div className="space-y-4">

                {users.map(user => (

                    <div
                        key={user._id}
                        className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
                    >

                        <div>

                            <h2 className="font-semibold">
                                {user.name}
                            </h2>

                            <p>
                                {user.email}
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                handleDelete(user._id)
                            }
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Delete
                        </button>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default AdminDashboard;