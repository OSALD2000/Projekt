import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./views/auth/LoginPage";
import SignUpPage from "./views/auth/SignUpPage";
import HomePage from "./views/HomePage";
import EmailVerificationPage, {
  action as emailVerificationAction,
  loader as emailVerificationLoader,
} from "./views/auth/EmailVerification";

import RootLayout from "./views/RootLayout";
import AuthLayout from "./views/auth/AuthLayout";

import {
  action as authAction,
  tokenloader,
  checkAuthLoader,
} from "./views/auth/auth";
import ErrorPage from "./views/Error";

const router = createBrowserRouter([
  {
    path: "/",
    loader: tokenloader,
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage />,
    children:[
      { index: true, element: <HomePage/>, loader: checkAuthLoader },
    ]
  }, 
  {
    path: "/auth",
    loader: tokenloader,
    element: <AuthLayout></AuthLayout>,
    errorElement: <ErrorPage />,
    children: [
      { path: "signin", element: <LoginPage></LoginPage>, action: authAction},
      {
        path: "signup",
        element: <SignUpPage></SignUpPage>,
        action: authAction,
      },
      {
        path: "emailverification",
        element: <EmailVerificationPage></EmailVerificationPage>,
        action: emailVerificationAction,
        loader: emailVerificationLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
