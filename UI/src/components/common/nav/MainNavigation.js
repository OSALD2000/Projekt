import React from "react";
import classes from "./mainNavigation.module.css";
import { NavLink } from "react-router-dom";

import Logo from "../Logo";

const mainNavigation = (props) => (
  <nav className={classes["main-nav"]}>
    <div className={classes["main-nav__logo"]}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? classes.active : undefined)}
        end
      >
        <Logo />
      </NavLink>
    </div>
    <div className="spacer" />
    <ul className="main-nav__items">
      <NavLink
        to="/auth/signin"
        className={({ isActive }) => (isActive ? classes.active : undefined)}
        end
      >
        Sign in
      </NavLink>
    </ul>
  </nav>
);

export default mainNavigation;
