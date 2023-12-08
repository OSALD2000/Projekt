import { NavLink, useRouteError } from "react-router-dom";
import React from "react";
import Layout from "../../components/layout/Lauout";
import MainNavigation from "../../components/common/nav/MainNavigation";

function ErrorPage() {
  const error = useRouteError();

  console.log(error);
  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <div>
      <NavLink to="/">HOME</NavLink>
      <p>{title} <br /> {message}</p>
    </div>
  );
}

export default ErrorPage;
