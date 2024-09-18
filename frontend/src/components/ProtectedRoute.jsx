/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useUserStore } from "../store";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserStore();
  console.log(user);

  if (!user?.email) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected route if authenticated
  return children;
};

export default ProtectedRoute;
