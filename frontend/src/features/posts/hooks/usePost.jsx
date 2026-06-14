import { useContext } from "react"
import { PostContext } from "../post.context"
import { getAllUsers } from "../services/user.api"
import { getAllPosts } from "../services/post.api"
import { AuthContext } from "../../auth/auth.context"

const usePost = () => {
    const { allUserList, setAllUserList, allPostList, setAllPostList } = useContext(PostContext)
    const {loading , setLoading , user , setUser} = useContext(AuthContext)

    const handleGetAllUsers = async () => {
        setLoading(true)
        const response = await getAllUsers();

        setAllUserList(response.users)
        setLoading(false)
    }

    const handleGetAllPosts = async () => {
        setLoading(true)
        const response = await getAllPosts();

        setAllPostList(response.posts)
        setLoading(false)
    }


    return {
        allUserList, allPostList, handleGetAllUsers, handleGetAllPosts , loading , user
    }
}

export default usePost