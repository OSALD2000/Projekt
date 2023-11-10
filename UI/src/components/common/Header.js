import React from "react";
import AuthNavigation from "./nav/AuthNavigation";
import classes from "../../css/navigation.module.css";

const Header = (props) => {
  return (
    <>
      {props.auth && (
        <header className={classes.header}>
          <AuthNavigation></AuthNavigation>
        </header>
      )}
    </>
  );
};

export default Header;
