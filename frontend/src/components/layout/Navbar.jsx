import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = async () => {

        await logout();

        navigate("/login", {
            replace: true,
        });

    };

    const navLinkClass = ({ isActive }) =>
        `transition-colors ${
            isActive
                ? "text-blue-600 font-semibold"
                : "hover:text-blue-600"
        }`;

    return (

        <nav className="bg-white shadow-md">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <NavLink
                    to="/dashboard"
                    className="text-2xl font-bold text-blue-600"
                >
                    Expense Tracker
                </NavLink>

                <div className="flex items-center gap-6">

                    <NavLink
                        to="/dashboard"
                        className={navLinkClass}
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/profile"
                        className={navLinkClass}
                    >
                        Profile
                    </NavLink>

                    {user?.role === "admin" && (

                        <NavLink
                            to="/admin"
                            className={navLinkClass}
                        >
                            Admin
                        </NavLink>

                    )}

                    <span className="font-medium text-gray-700">
                        {user?.name || "User"}
                    </span>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

};

export default Navbar;