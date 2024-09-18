/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Assuming you store auth state in Redux

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.userName);
  console.log(user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected route if authenticated
  return children;
};

export default ProtectedRoute;
