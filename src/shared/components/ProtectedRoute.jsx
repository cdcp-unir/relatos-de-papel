import { Navigate } from "react-router";
import { PATHS } from "../../app/router/paths";

export default function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} replace />;
  }

  return children;
}