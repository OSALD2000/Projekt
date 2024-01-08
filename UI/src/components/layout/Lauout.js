import React from "react";
import AuthNavigation from "../common/nav/AuthNavigation";
import MainNavigation from "../common/nav/MainNavigation";

import classes from "./layout.module.css";

const layout = ({children, signIn}) => {

  return (
    <>
      {signIn ? <AuthNavigation /> : <MainNavigation />}
      <main className={classes.content}>{children}</main>
    </>
  );
};

export default layout;
