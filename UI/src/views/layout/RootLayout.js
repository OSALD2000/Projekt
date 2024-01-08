import React from "react";
import Layout from "../../components/layout/Lauout";
import MainNavigation from "../../components/common/nav/MainNavigation";

import { Outlet } from "react-router";
const RootLayout = () => {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default RootLayout;
