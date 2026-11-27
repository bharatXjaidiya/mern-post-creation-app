import { createBrowserRouter } from "react-router"
import Register from "./features/auth/pages/Register"
import Login from "./features/auth/pages/Login"
import Feed from "./features/posts/pages/Feed"
import CreatePost from "./features/posts/pages/CreatePost"
import Profile from "./features/users/pages/Profile"
import Protected from "./shared/Protected"
import Search from "./features/search/pages/Search"


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><Feed /></Protected>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/create-post",
        element: <Protected> <CreatePost /></Protected>
    },
    {
        path: "/profile/:userId",
        element: <Protected><Profile /></Protected>
    },
    {
        path : "/search",
        element : <Protected><Search /></Protected>
    }
])

