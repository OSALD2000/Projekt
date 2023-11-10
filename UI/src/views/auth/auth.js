import { json, redirect } from "react-router-dom";
import { storeToken } from "../../util/storeToken";

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode");

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: " Unsupported mode" }, { status: 422 });
  }

  const method = mode === "login" ? "POST" : "PUT";

  const data = await request.formData();

  const userData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  if (mode === "signup") {
    userData["username"] = data.get("username");
  }

  const response = await fetch("http://localhost:8080/auth/" + mode, {
    method: method,
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": " application/json",
    },
  });

  if (response.status === 442 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user" }, { status: 500 });
  }

  if(mode === "signup") {
    localStorage.setItem("email", userData.email);
  }

  if (mode === "login") {
    const resData = await response.json();
    const token = resData.token;
    storeToken(token, 1);
    return redirect("/");
  }

  return redirect("/emailverification");
};

export const tokenloader = () => {
  return getAuthToken();
};

export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  const tokenDuration = getTokenDuration();

  if (!token) {
    return null;
  }

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
};

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/signin");
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
