import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token, loadingAuth } = useAuth();

  if (loadingAuth) return <h2>Loading...</h2>;

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}