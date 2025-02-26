import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminRouteProtect = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null || user?.role === "candidate") {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);
  return user && user.role === "recruiter" ? <>{children}</> : null;
};

export default AdminRouteProtect;
