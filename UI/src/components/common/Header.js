import React from "react";
import Navigation from "./nav/Navigation";
import classes from "../../css/navigation.module.css";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <Navigation></Navigation>
    </header>
  );
};

export default Header;
