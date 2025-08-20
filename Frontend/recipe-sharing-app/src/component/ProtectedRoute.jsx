import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
   const isLoggedIn = !!localStorage.getItem("token");
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname, alert: "Please login to access this page" , background: location }}
      />
    );
  }

  return children;
}
