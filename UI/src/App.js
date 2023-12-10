import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./views/auth/LoginPage";
import SignUpPage from "./views/auth/SignUpPage";
import HomePage, { loader as homePageLodaer } from "./views/home/HomePage";
import EmailVerificationPage, { action as emailVerificationAction, loader as emailVerificationLoader, } from "./views/auth/EmailVerification";
import CreateQuizPage, { action as CreateAction } from "./views/quiz/CreateQuiz";
import QuizePage, { loader as quizLoader } from "./views/quiz/QuizePage";
import RootLayout from "./views/layout/RootLayout";
import AuthLayout from "./views/auth/AuthLayout";
import AnswerQuiz, { action as answerAction, loader as loadQuiz } from "./views/quiz/AnswerQuiz";
import ViewAnswerPage, { loader as viewAnswerPageLoader } from "./views/quiz/ViewAnswerPage";
import ProfilePage, { loader as profileDatenLoader } from "./views/profielPage/ProfilePage";
import { action as authAction, checkAuthLoader, tokenloader, } from "./views/auth/auth";
import StatisticPage, { loader as statisticLoader } from "./views/statisticPage/StatisticPage";
import ViewQuizPage, { loader as viewQuizPageLoader } from "./views/quiz/ViewQuizPage";
import ControlPanel, { loader as controlPanelLoader } from "./views/admin/controlPanel";
import { loadUserProfile, loadUserQuiz, loadStatistic, loadAnswer } from "./views/admin/admin_loaders";
import ErrorPage from "./views/error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    loader: tokenloader,
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: homePageLodaer }
      , {
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
            path: "view-answers/:quizId",
            element: <ViewAnswerPage />,
            loader: viewAnswerPageLoader
          },
          {
            path: "view-statistic/:quizId",
            element: <StatisticPage />,
            loader: statisticLoader
          }]
      }
      , {
        path: "user",
        loader: checkAuthLoader,
        children: [{
          path: "profile",
          element: <ProfilePage />,
          loader: profileDatenLoader,
        },
        {
          path: "view-quiz/:quizId",
          element: <ViewQuizPage />,
          loader: viewQuizPageLoader,
        }],
      }, {
        path: "/admin",
        children: [
          {
            index: true, element: <ControlPanel />, loader: controlPanelLoader
          }, {
            path: "user/profile/:userId",
            element: <ProfilePage />,
            loader: loadUserProfile
          }, {
            path: "user/quiz/:userId/:quizId",
            element: <ViewQuizPage />,
            loader: loadUserQuiz
          }, {
            path: "statistic/:quizId",
            element: <StatisticPage />,
            loader: loadStatistic
          }, {
            path: "user/answer/:userId/:quizId",
            element: <ViewAnswerPage />,
            loader: loadAnswer
          }
        ]
      }
    ],
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
