import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {

    };

    const login = async (email, password) => {

    };

    const register = async (userData) => {

    };

    const logout = () => {

    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
const checkAuth = async () => {

    try {

        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        const response = await api.get("/auth/profile");

        setUser(response.data.data);

    } catch (error) {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

    } finally {

        setLoading(false);

    }

};
const login = async (email, password) => {

    try {

        const response = await api.post("/auth/login", {
            email,
            password,
        });

        localStorage.setItem("token", response.data.token);

        localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
        );

        setUser(response.data.user);

        toast.success("Login Successful");

    } catch (error) {

        toast.error(
            error.response?.data?.message ||
            "Login Failed"
        );

        throw error;

    }

};
const register = async (userData) => {

    try {

        const response = await api.post(
            "/auth/register",
            userData
        );

        toast.success(response.data.message);

    } catch (error) {

        toast.error(
            error.response?.data?.message ||
            "Registration Failed"
        );

        throw error;

    }

};
const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);

    toast.success("Logged Out");

};
