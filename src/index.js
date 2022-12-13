import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from 'src/router'
import { RouterProvider } from 'react-router-dom'

import { request } from 'src/libs/request'

import { store } from 'src/store'
import { setUser } from 'src/store/user'

import { Provider } from 'react-redux'

import 'src/styles/index.css'

const app = ReactDOM.createRoot(document.getElementById('app'))


request.get('/user/info').then(res => {
  store.dispatch(setUser(res.data))
})


app.render(
  <>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </>
)