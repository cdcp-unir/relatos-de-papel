import { Navigate } from "react-router";
import { PATHS } from "../../app/router/paths";
import { useLoginState } from "../../state/loginState";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useLoginState();

  if (!isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} replace />;
  }

  return children;
}