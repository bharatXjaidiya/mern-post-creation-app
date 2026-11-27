import React from 'react'
import { RouterProvider } from "react-router/dom"
import { router } from './app.routes'
import "./shared/global.scss"
import { AuthProvider } from './features/auth/auth.context'
import { PostProvider } from './features/posts/post.context'
import { UserProvider } from './features/users/user.context'
import { ToastContainer, toast } from 'react-toastify';
import { SearchProvider } from './features/search/search.context'

const App = () => {

  return (
    <AuthProvider>
      <PostProvider>
        <UserProvider>
          <SearchProvider>
            <RouterProvider router={router} />
            <ToastContainer />
          </SearchProvider>
        </UserProvider>
      </PostProvider>
    </AuthProvider>

  )
}

export default App
