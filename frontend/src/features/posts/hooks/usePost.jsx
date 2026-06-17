import { useContext } from "react"
import { PostContext } from "../post.context"
import { getAllUsers } from "../services/user.api"
import { getAllLikes, getAllPosts, likePost } from "../services/post.api"
import { AuthContext } from "../../auth/auth.context"

const usePost = () => {
    const {loading , setLoading , allUserList, setAllUserList, allPostList, setAllPostList } = useContext(PostContext)
    const {user , setUser} = useContext(AuthContext)

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

    const handleLikePost = async (postId) =>{
        const response = await likePost(postId);

        return response.message;
    }

    const handleGetAllLikes = async (postId) =>{
        const response = await getAllLikes(postId)

        return response.allLikes
    }

    return {
        allUserList, allPostList, handleGetAllUsers, handleGetAllPosts , loading , user , handleLikePost , handleGetAllLikes
    }
}

export default usePost