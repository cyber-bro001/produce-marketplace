import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import LoadingSpinner from "./LoadingSpinner";

interface ProtectedRouteProps {
  role?: "buyer" | "seller";
}

function ProtectedRoute({ role }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingSpinner fullPage />;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user?.role !== role) {
    const redirect = user?.role === "seller" ? "/dashboard" : "/";
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
