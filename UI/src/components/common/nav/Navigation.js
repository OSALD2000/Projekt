import React from "react";
import { NavLink } from "react-router-dom";
import classes from "../../../css/navigation.module.css";

const Navigation = () => {
  return (
    <nav className={classes["navigation-style1"]}>
        <ul>
          <li>
            <NavLink to="/" className={({isActive})=> isActive ? classes.active : undefined} end>Sign in</NavLink>
          </li>
          <li>
            <NavLink to="/signup"  className={({isActive})=> isActive ? classes.active : undefined} end>Sign Up</NavLink>
          </li>
        </ul>
    </nav>
  );
};

export default Navigation;
