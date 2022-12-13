import { createBrowserRouter } from 'react-router-dom'

import { store } from 'src/store'
import { setUser } from 'src/store/user'
import { request } from 'src/libs/request'

import LandingLayout from 'src/layouts/landing/Layout'
import LoginPage from 'src/pages/LoginPage'
import MainLayout from 'src/layouts/main/Layout'
import IndexPage from 'src/pages/IndexPage'

const router = createBrowserRouter([
  {
    path: 'landing',
    element: <LandingLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />
      }
    ],
  },
  {
    path: '',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <IndexPage />
      }
    ],
  },
])

export { router }