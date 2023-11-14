import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./navigation.module.css";

const AuthNavigation = (props) => {
  return (
    <header className={classes.header}>
      <nav className={classes["navigation-style1"]}>
        <ul>
          <li>
            <NavLink
              to="/auth/signin"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Sign in
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/auth/signup"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Sign Up
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AuthNavigation;
