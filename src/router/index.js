import { createBrowserRouter } from "react-router-dom";

import { store } from "src/store";
import { setUser } from "src/store/user";
import { request } from "src/libs/request";

import LandingLayout from "src/layouts/landing/Layout";
import LoginPage from "src/pages/LoginPage";
import {
  JoinPage0,
  JoinPage1,
  JoinPage2,
  JoinPage3,
  EmailAuth,
  FindPWord,
} from "src/pages/JoinPage";
import MainLayout from "src/layouts/main/Layout";
import IndexPage from "src/pages/IndexPage";

const router = createBrowserRouter([
  {
    path: "landing",
    element: <LandingLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "join0",
        element: <JoinPage0 />,
      },
      {
        path: "join1",
        element: <JoinPage1 />,
      },
      {
        path: "join2",
        element: <JoinPage2 />,
      },
      {
        path: "join3",
        element: <JoinPage3 />,
      },
      {
        path: "emailauth",
        element: <EmailAuth />,
      },
      {
        path: "findpword",
        element: <FindPWord />,
      },
    ],
  },
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
    ],
  },
]);

export { router };
