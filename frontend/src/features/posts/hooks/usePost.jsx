import { useContext, useEffect } from "react"
import { PostContext } from "../post.context"
import { createPost, getAllPosts } from "../services/post.api"
import { AuthContext } from "../../auth/auth.context"

const usePost = () => {
    const { loading, setLoading, allUserList, setAllUserList, allPostList, setAllPostList } = useContext(PostContext)
    const { user, setUser } = useContext(AuthContext)

    const handleGetAllPosts = async () => {
        setLoading(true)
        const response = await getAllPosts();
        setAllPostList(response.posts)
        setLoading(false)
    }

    const handleCreatePost = async (caption, description, image) => {
        setLoading(true);
        const response = await createPost(caption, description, image);
        setAllPostList((prev) => [response.post, ...prev]);
        setLoading(false)
    }


    return {
        allUserList, handleGetAllPosts, loading, user, handleCreatePost , allPostList
    }
}

export default usePost