// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ShipmentsPage from "./pages/ShipmentPage";
import WeightPage from "./pages/WeightPage";


// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

// Public route component - redirects to dashboard if already logged in
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route path="weight" element={<WeightPage />} />
        <Route path="shipments" element={<ShipmentsPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>


        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}