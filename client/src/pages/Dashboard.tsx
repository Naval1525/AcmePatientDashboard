// src/pages/Dashboard.tsx

import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import DashboardOverview from "../components/dashboard/DashboardOverview";

export default function Dashboard() {
  const location = useLocation();

  // Show overview on main dashboard route
  const showOverview = location.pathname === "/dashboard";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1">
          {showOverview ? <DashboardOverview /> : <Outlet />}
        </main>
      </div>
    </div>
  );
}