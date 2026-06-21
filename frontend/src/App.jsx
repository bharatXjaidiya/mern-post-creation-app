import React from 'react'
import { RouterProvider } from "react-router/dom"
import { router } from './app.routes'
import "./shared/global.scss"
import { AuthProvider } from './features/auth/auth.context'
import { PostProvider } from './features/posts/post.context'
import { UserProvider } from './features/users/user.context'

const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </PostProvider>
    </AuthProvider>

  )
}

export default App
