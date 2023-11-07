import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./views/auth/LoginPage";
import SignUpPage from "./views/auth/SignUpPage";
import RootLayout from "./views/RootLayout";
import { action as authAction, tokenloader, checkAuthLoader } from "./views/auth/auth";

const router = createBrowserRouter([
  {
    path: "/",
    loader: tokenloader,
    element: <RootLayout></RootLayout>,
    children: [
      {index: true, element:  <h1>Home Page</h1>, loader:checkAuthLoader},
      { path: "/signin", element: <LoginPage></LoginPage>, action: authAction },
      {
        path: "/signup",
        element: <SignUpPage></SignUpPage>,
        action: authAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
