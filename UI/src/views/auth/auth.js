import { json, redirect } from "react-router-dom";
import { storeToken } from "../../util/storeToken";
import { fetch_function } from "../../util/fetch_function";

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode");

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: " Unsupported mode" }, { status: 422 });
  }

  const data = await request.formData();

  localStorage.setItem("email", data.get("email"));

  const userData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  if (mode === "signup") {
    userData["username"] = data.get("username");
  }

  const url = `auth/${mode}`
  const response = await fetch_function(url, 'POST', userData);

  if (response.status === 423) {
    return redirect("/auth/emailverification");
  }

  if (response.status === 442 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user" }, { status: 500 });
  }

  if (mode === "login") {
    const resData = await response.json();
    const token = resData.token;
    if (resData.admin) {
      localStorage.setItem('admin', true);
    }
    storeToken(token, 1);
    return redirect("/");
  }

  return redirect("/auth/emailverification");
};

export const tokenloader = () => {
  return getAuthToken();
};

export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  const tokenDuration = getTokenDuration();

  if (!token) {
    return false;
  }

  if (tokenDuration < 0) {
    localStorage.clear();
    return redirect("/auth/signin");
  }

  return token;
};

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth/signin");
  }
  return true;
}

export const getTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
};
