import React from "react";
import Header from "../components/common/Header";
import { Outlet } from "react-router";
const RootLayout = (props) =>
{
    return(
        <>
            <Header/>
            <Outlet/>
        </>
    )
}

export default RootLayout;
