import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface PrivateRouteProps {
  redirectTo: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ redirectTo }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
      throw new Error("AuthContext must be used within an AuthProvider");
    }

  const { user } = authContext;

  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
