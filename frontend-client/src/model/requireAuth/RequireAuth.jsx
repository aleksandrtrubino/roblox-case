import {useSelector} from "react-redux";
import {selectUserRole} from "../authSlice";
import { useJwt } from "react-jwt"
import Cookies from 'js-cookie';
import {Navigate, Outlet, useLocation} from "react-router-dom";


export const RequireAuth = () =>{

    const userRole = useSelector(selectUserRole);
    const isUserRoleValid = userRole === ("user")
    const token = Cookies.get("userRefreshToken")
    const {isExpired} = useJwt(token);
    const location = useLocation()

    return (
        !isExpired && isUserRoleValid
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}