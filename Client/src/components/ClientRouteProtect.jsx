import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ClientRouteProtect = ({children}) => {
    const { user } = useSelector((store) => store.auth);
    const navigate = useNavigate()
    useEffect(() => {
      if(user === null){
        navigate('/login', { replace: true })
      }
    },[user, navigate])
    return user && user.role === "candidate" ? <>{children}</> : null;
}

export default ClientRouteProtect