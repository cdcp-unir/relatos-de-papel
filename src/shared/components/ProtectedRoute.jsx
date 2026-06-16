import { Navigate, useLocation } from "react-router-dom";
import { PATHS } from "../../app/router/paths";
import { isAuthenticated } from "../../state/loginState";
export default function ProtectedRoute({ children }) {
  const location = useLocation();

  const authenticated = isAuthenticated();

  if (!authenticated) {
    return (
      <Navigate
        to={PATHS.LOGIN}
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}