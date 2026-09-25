import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

function App() {
    return (
        <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />
                    <Route
                        path="/profile"
                        element={<Profile />}
                    />
                </Route>

                <Route element={<AdminRoute />}>
                    <Route
                        path="/admin"
                        element={<AdminDashboard />}
                    />
                </Route>

                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
        </Routes>
    );
}

export default App;
