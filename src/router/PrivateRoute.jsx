import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const { pathname } = useLocation();

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (!user) {
    return <Navigate state={{ from: pathname }} to="/signIn"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
