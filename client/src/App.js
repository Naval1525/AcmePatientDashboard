import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ShipmentsPage from "./pages/ShipmentPage";
import WeightPage from "./pages/WeightPage";
// Protected route component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" }) }));
    }
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/auth", replace: true });
    }
    return children;
};
// Public route component - redirects to dashboard if already logged in
const PublicRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" }) }));
    }
    if (isAuthenticated) {
        return _jsx(Navigate, { to: "/dashboard", replace: true });
    }
    return children;
};
function AppRoutes() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/auth", element: _jsx(PublicRoute, { children: _jsx(Auth, {}) }) }), _jsxs(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { children: _jsx(Dashboard, {}) }), children: [_jsx(Route, { path: "weight", element: _jsx(WeightPage, {}) }), _jsx(Route, { path: "shipments", element: _jsx(ShipmentsPage, {}) })] }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/dashboard", replace: true }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/dashboard", replace: true }) })] }));
}
export default function App() {
    return (_jsx(AuthProvider, { children: _jsx(Router, { children: _jsx(AppRoutes, {}) }) }));
}
