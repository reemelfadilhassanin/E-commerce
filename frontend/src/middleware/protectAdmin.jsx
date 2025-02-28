import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectAdmin = () => {
  const {role} = useSelector((state) => state.signin);
console.log(role);  
  if (!role || role === false) {
    return <Navigate to="/accessDenied" replace />;
  }

  return <Outlet />;
};

export default ProtectAdmin;
