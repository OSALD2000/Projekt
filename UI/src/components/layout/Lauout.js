import React from "react";
import AuthNavigation from "../common/nav/AuthNavigation";
import MainNavigation from "../common/nav/MainNavigation";

import classes from "./layout.module.css";

const layout = (props) => {

  return (
    <>
      {props.signIn ? <AuthNavigation /> : <MainNavigation />}
      <main className={classes.content}>{props.children}</main>
    </>
  );
};

export default layout;
