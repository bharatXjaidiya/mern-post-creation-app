import { Navigate, useLocation } from "react-router";
import Loading from "./Loading";
import useAuth from "../features/auth/hooks/useAuth";

export default function Protected({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading fullScreen text="Checking login..." />;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}