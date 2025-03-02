// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import UseLoading from "../components/ui/useLoading";
// const ProtectAdmin = () => {
//   const { role } = useSelector((state) => state.signin);
//   const [isAdmin, setIsAdmin] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/admin", {
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.isAdmin) {
//           setIsAdmin(true);
//         } else {
//           setIsAdmin(false);
//         }
//       })
//       .catch(() => setIsAdmin(false));
//   }, []);

//   if (isAdmin === null) return <UseLoading/>

//   if (!isAdmin) {
//     return <Navigate to="/accessDenied" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectAdmin;

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectAdmin = () => {
  const { role } = useSelector((state) => state.signin);
  console.log(role);
  if (!role || role === false) {
    return <Navigate to="/accessDenied" replace />;
  }

  return <Outlet />;
};

export default ProtectAdmin;
