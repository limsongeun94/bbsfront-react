import { createBrowserRouter } from "react-router-dom";

import { store } from "src/store";
import { setUser } from "src/store/user";
import { request } from "src/libs/request";

import LandingLayout from "src/layouts/landing/Layout";
import LoginPage from "src/pages/sign/LoginPage";
import {
  JoinPage0,
  JoinPage1,
  JoinPage2,
  JoinPage3,
} from "src/pages/sign/JoinPage";
import FindPWordPage from "src/pages/sign/FindPassword";
import EmailAuthPage from "src/pages/sign/EmailAuthPage";
import MainLayout from "src/pages/main/Layout";
import IndexPage from "src/pages/main/IndexPage";
import PostListPage from "src/pages/post/PostListPage";
import PostDetailPage from "src/pages/post/PostDetailPage";

const router = createBrowserRouter([
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
  {
    path: "landing",
    // element: <LandingLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "join",
        children: [
          {
            path: "0",
            element: <JoinPage0 />,
          },
          {
            path: "1",
            element: <JoinPage1 />,
          },
          {
            path: "2",
            element: <JoinPage2 />,
          },
          {
            path: "3",
            element: <JoinPage3 />,
          },
        ],
      },
      {
        path: "emailauth",
        element: <EmailAuthPage />,
      },
      {
        path: "findpword",
        element: <FindPWordPage />,
      },
    ],
  },
  {
    path: "post",
    children: [
      {
        path: "list",
        element: <PostListPage />,
      },
      {
        path: "detail",
        children: [
          {
            path: ":id",
            element: <PostDetailPage />,
          },
        ],
      },
    ],
  },
]);

export { router };
