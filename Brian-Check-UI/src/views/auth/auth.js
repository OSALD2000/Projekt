import { json, redirect } from "react-router-dom";

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode");

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: " Unsupported mode" }, { status: 422 });
  }

  const data = await request.formData();

  const userData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  if (mode !== "login") {
    userData["email"] = data.get("email");
  }

  console.log(userData);
  // fetch response

  // mange response

  // mange that token

  return null;
};

export const tokenloader = () => {
  return getAuthToken();
};

export const getAuthToken = () => {
  return null;
};

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/signin");
  }
  return true;
}
