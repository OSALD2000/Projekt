import {  useRouteError } from "react-router-dom";

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
    <>
        <p>{title} <br/> {message}</p>
    </>
  );
}

export default ErrorPage;
