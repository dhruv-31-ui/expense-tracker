import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

// Routes
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

function App() {
    return (
        <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />
            </Route>

            {/* 404 */}
            <Route
                path="*"
                element={<h1>404 - Page Not Found</h1>}
            />

        </Routes>
    );
}

export default App;