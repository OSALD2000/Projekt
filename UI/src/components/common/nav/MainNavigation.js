import React, { useState } from "react";
import classes from "./mainNavigation.module.css";
import { NavLink } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

import Logo from "../Logo";

const MinNavigation = (props) => {
  const data = useLoaderData();
  const [auth, setAuth] = useState(data);
  const isAdmin = localStorage.getItem('admin');

  const logoutHandler = () => {
    localStorage.clear();
    setAuth(false);
  }

  return (
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
      <div className={classes["spacer"]} />
      <ul className={classes["main-nav__items"]}>
        {!auth ? <li>
          <NavLink
            to="/auth/signin"
            className={({ isActive }) => (isActive ? classes.active : undefined)}
            end
          >
            Sign in
          </NavLink>
        </li>
          :
          <>
            <li>
              <NavLink to="/" onClick={logoutHandler}>Log Out</NavLink>
            </li>

            <li>
              <NavLink to="/user/profile">Profile</NavLink>
            </li>

            <li>
              <NavLink to="/quiz/create">Create</NavLink>
            </li>
            {
              isAdmin &&
              <li>
                <NavLink to="/admin">Control Panel</NavLink>
              </li>
            }
          </>
        }
      </ul>
    </nav>
  );
}

export default MinNavigation;
