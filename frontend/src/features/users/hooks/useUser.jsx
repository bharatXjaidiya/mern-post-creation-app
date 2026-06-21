import React, { useContext , useEffect } from 'react'
import { UserContext } from '../user.context'
import { getMe, getPosts } from '../services/user.api'

const useUser = () => {
    const { user, setUser, loading, setLoading , userPostList , setUserPostList } = useContext(UserContext)

    const handleGetMe = async () => {
        const response = await getMe();
        setUser(response.user)
    }

    const handleGetPosts = async (userId) =>{
        const response = await getPosts(userId);
        setUserPostList(response.posts)
    }

    useEffect(() => {
        handleGetMe()
    },[])

    useEffect(()=>{
        if(!(user._id === undefined))
        handleGetPosts(user._id)
    },[user])

    return (
        { user, loading, handleGetMe , userPostList }
    )
}

export default useUser
