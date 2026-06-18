import { useContext } from "react"
import { PostContext } from "../post.context"
import { getAllUsers } from "../services/user.api"
import { commentPost, deleteComment, getAllComments, getAllLikes, getAllPosts, likePost } from "../services/post.api"
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

    const handleCommentPost = async (postId,comment) =>{
        const response = await commentPost(postId,comment);

        return response.comment;
    }

    const handleGetAllComments = async (postId) =>{
        const response = await getAllComments(postId);

        return response.allComments;
    }

    const handleDeleteComment = async (commentId) =>{
        const response = await deleteComment(commentId);

        return response.message;
    }


    return {
        allUserList, allPostList, handleGetAllUsers, handleGetAllPosts , loading , user , handleLikePost , handleGetAllLikes ,handleGetAllComments , handleCommentPost , handleDeleteComment
    }
}

export default usePost