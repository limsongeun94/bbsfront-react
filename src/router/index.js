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
import FindPassWord from "src/pages/sign/FindPWordPage";
import {
  ResetPWordPage,
  CompletePWordPage,
} from "src/pages/sign/ResetPWordPage";
import EmailAuthPage from "src/pages/sign/EmailAuthPage";
import MainLayout from "src/pages/main/Layout";
import IndexPage from "src/pages/main/IndexPage";
import PostListPage from "src/pages/post/PostListPage";
import PostDetailPage from "src/pages/post/PostDetailPage";
import PostWritePageNew from "src/pages/post/PostWritePage_new";
import PostWritePageEdit from "src/pages/post/PostWritePage_edit";
import UserInfoPage from "src/pages/user/UserInfoPage";
import NoticeListPage from "src/pages/notice/NoticeListPage";
import NoticeDetailPage from "src/pages/notice/NoticeDetailPage";

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
        element: <FindPassWord />,
      },
      {
        path: "resetpword",
        element: <ResetPWordPage />,
      },
      {
        path: "resetpword/complete",
        element: <CompletePWordPage />,
      },
    ],
  },
  {
    path: "post",
    element: <MainLayout />,
    children: [
      {
        path: "list/:board_id",
        element: <PostListPage />,
      },
      {
        path: "detail/:board_id/:post_id",
        element: <PostDetailPage />,
      },
    ],
  },
  {
    path: "post/writer",
    children: [
      {
        path: "new",
        element: <PostWritePageNew />,
      },
      {
        path: "update/:board_id/:post_id",
        element: <PostWritePageEdit />,
      },
    ],
  },
  {
    path: "notice",
    element: <MainLayout />,
    children: [
      {
        path: "list",
        element: <NoticeListPage />,
      },
      {
        path: "detail/:id",
        element: <NoticeDetailPage />,
      },
    ],
  },
  {
    path: "user/info/:user_id",
    element: <UserInfoPage />,
  },
]);

export { router };
