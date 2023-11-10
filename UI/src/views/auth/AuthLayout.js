import React from "react";
import Header from "../../components/common/Header";
import { Outlet } from "react-router";
const AuthLayout = (props) =>
{
    return(
        <>
            <Header auth={true}/>
            <Outlet/>
        </>
    )
}

export default AuthLayout;
