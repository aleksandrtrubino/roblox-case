import React from 'react';
import { Outlet } from 'react-router-dom';


import {Footer} from "../../containers/footer/Footer";
import AuthHeader from "../../containers/header/authHeader";
import register from "../../../pages/Register/Register";
import login from "../../../pages/login/Login";

const AuthLayout = () => {
    return (
        <>
            <AuthHeader />
            <Outlet />
            <Footer />
        </>
    )
}

export  { AuthLayout };
