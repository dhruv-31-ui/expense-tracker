import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">

            <h1 className="text-3xl font-bold mb-6">
                My Profile
            </h1>

            <div className="space-y-5">

                <div>
                    <h3 className="text-gray-500">
                        Name
                    </h3>

                    <p className="text-xl font-semibold">
                        {user?.name}
                    </p>
                </div>

                <div>
                    <h3 className="text-gray-500">
                        Email
                    </h3>

                    <p className="text-xl font-semibold">
                        {user?.email}
                    </p>
                </div>

                <div>
                    <h3 className="text-gray-500">
                        Role
                    </h3>

                    <span
                        className={`px-4 py-2 rounded-lg text-white ${
                            user?.role === "admin"
                                ? "bg-red-500"
                                : "bg-green-500"
                        }`}
                    >
                        {user?.role}
                    </span>
                </div>

            </div>

        </div>
    );
};

export default Profile;