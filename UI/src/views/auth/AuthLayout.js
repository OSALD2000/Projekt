import React from "react";
import Layout from "../../components/layout/Lauout";

import { Outlet } from "react-router";
const AuthLayout = (props) => {
  return (
    <>
      <Layout signIn={true} />

      <Outlet />
    </>
  );
};

export default AuthLayout;
