import {createBrowserRouter} from "react-router"
import Register from "./features/auth/pages/Register"
import Login from "./features/auth/pages/Login"
import Feed from "./features/posts/pages/Feed"
import CreatePost from "./features/posts/pages/CreatePost"


export const router = createBrowserRouter([
    {
        path : "/",
        element : <Feed/>
    },
    {
        path : "/register",
        element : <Register/>
    },
    {
        path : "/login",
        element : <Login/>
    },
    {
        path : "/create-post",
        element : <CreatePost />
    }
])

