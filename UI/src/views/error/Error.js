import { NavLink, useRouteError } from "react-router-dom";
import React from "react";


function ErrorPage() {
  const error = useRouteError();

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
