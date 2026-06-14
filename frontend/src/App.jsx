import React from 'react'
import { RouterProvider } from "react-router/dom"
import { router } from './app.routes'
import "./shared/global.scss"
import { AuthProvider } from './features/auth/auth.context'
import { PostProvider } from './features/posts/post.context'

const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <RouterProvider router={router} />
      </PostProvider>
    </AuthProvider>

  )
}

export default App
