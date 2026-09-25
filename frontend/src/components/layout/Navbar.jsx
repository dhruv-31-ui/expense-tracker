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

        <nav className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">

                <NavLink
                    to="/dashboard"
                    className="text-xl font-bold tracking-tight text-indigo-700"
                >
                    Expense Tracker
                </NavLink>

                <div className="flex items-center gap-3 sm:gap-5">

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
                        className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-rose-50 hover:text-rose-700 sm:px-4"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

};

export default Navbar;
