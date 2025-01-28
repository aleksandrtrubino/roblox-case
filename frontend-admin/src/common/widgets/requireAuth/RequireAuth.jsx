import {useSelector} from "react-redux";
import {selectUserRole} from "../../../model/authSlice";
import { useJwt } from "react-jwt"
import Cookies from 'js-cookie';
import {Navigate, Outlet, useLocation} from "react-router-dom";


export const RequireAuth = () =>{

    const userRole = useSelector(selectUserRole);
    const isUserRoleValid = (userRole === 'admin' || userRole === 'moderator')
    const token = Cookies.get("adminRefreshToken")
    const {isExpired} = useJwt(token);
    const location = useLocation()

    return (
        isUserRoleValid
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}