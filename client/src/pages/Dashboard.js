import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Dashboard.tsx
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import DashboardOverview from "../components/dashboard/DashboardOverview";
export default function Dashboard() {
    const location = useLocation();
    // Show overview on main dashboard route
    const showOverview = location.pathname === "/dashboard";
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx(Navbar, {}), _jsxs("div", { className: "flex", children: [_jsx(Sidebar, {}), _jsx("main", { className: "flex-1", children: showOverview ? _jsx(DashboardOverview, {}) : _jsx(Outlet, {}) })] })] }));
}
