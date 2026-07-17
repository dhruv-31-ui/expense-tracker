import { useAuth } from "../context/AuthContext";

const Profile = () => {

    const { user } = useAuth();

    if (!user) {
        return (
            <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8 text-center">
                <h2 className="text-2xl font-semibold">
                    Loading Profile...
                </h2>
            </div>
        );
    }

    return (

        <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">

            <h1 className="text-3xl font-bold mb-8">
                My Profile
            </h1>

            <div className="space-y-6">

                <div>

                    <h3 className="text-gray-500 text-sm uppercase tracking-wide">
                        Name
                    </h3>

                    <p className="text-xl font-semibold">
                        {user.name || "Not Available"}
                    </p>

                </div>

                <div>

                    <h3 className="text-gray-500 text-sm uppercase tracking-wide">
                        Email
                    </h3>

                    <p className="text-xl font-semibold">
                        {user.email || "Not Available"}
                    </p>

                </div>

                <div>

                    <h3 className="text-gray-500 text-sm uppercase tracking-wide">
                        Role
                    </h3>

                    <span
                        className={`inline-block px-4 py-2 rounded-lg text-white font-medium ${
                            user.role === "admin"
                                ? "bg-red-500"
                                : "bg-green-500"
                        }`}
                    >
                        {user.role
                            ? user.role.charAt(0).toUpperCase() +
                              user.role.slice(1)
                            : "User"}
                    </span>

                </div>

            </div>

        </div>

    );

};

export default Profile;