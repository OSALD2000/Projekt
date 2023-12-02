import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./views/auth/LoginPage";
import SignUpPage from "./views/auth/SignUpPage";
import HomePage, { loader as homePageLodaer } from "./views/HomePage";
import EmailVerificationPage, {
  action as emailVerificationAction,
  loader as emailVerificationLoader,
} from "./views/auth/EmailVerification";
import CreateQuizPage, { action as CreateAction } from "./views/createQuiz";
import QuizePage, { loader as quizLoader } from "./views/QuizePage";
import RootLayout from "./views/RootLayout";
import AuthLayout from "./views/auth/AuthLayout";
import AnswerQuiz, { action as answerAction, loader as loadQuiz } from "./views/answerQuiz";
import ViewAnswerPage, {loader as viewAnswerPageLoader} from "./views/viewAnswerPage";

import {
  action as authAction,
  checkAuthLoader,
  tokenloader,
} from "./views/auth/auth";
import ErrorPage from "./views/Error";

const router = createBrowserRouter([
  {
    path: "/",
    loader: tokenloader,
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <HomePage />, loader: homePageLodaer }, {
      path: "quiz",
      loader: checkAuthLoader,
      children: [
        {
          path: ":category",
          element: <QuizePage />,
          loader: quizLoader,
        },
        {
          path: "create",
          element: <CreateQuizPage />,
          action: CreateAction
        },
        {
          path: "answerQuiz/:quizId",
          element: <AnswerQuiz />,
          action: answerAction,
          loader: loadQuiz
        },
        {
          path: "view-answers/:quizId/:participantId",
          element: <ViewAnswerPage />,
          loader: viewAnswerPageLoader
        }]
    }],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    errorElement: <ErrorPage />,
    children: [
      { path: "signin", element: <LoginPage></LoginPage>, action: authAction },
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
