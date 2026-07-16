import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <nav className="bg-white shadow-md">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link
                    to="/dashboard"
                    className="text-2xl font-bold text-blue-600"
                >
                    Expense Tracker
                </Link>

                <div className="flex items-center gap-6">

                    <Link
                        to="/dashboard"
                        className="hover:text-blue-600"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/profile"
                        className="hover:text-blue-600"
                    >
                        Profile
                    </Link>

                    {user?.role === "admin" && (

                        <Link
                            to="/admin"
                            className="hover:text-blue-600"
                        >
                            Admin
                        </Link>

                    )}

                    <span className="font-medium">

                        {user?.name}

                    </span>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

};

export default Navbar;