import React, { useContext , useEffect } from 'react'
import { UserContext } from '../user.context'
import { getPosts } from '../services/user.api'
import { AuthContext } from '../../auth/auth.context'

const useUser = () => {
    const { profileUser, setProfileUserUser, loading, setLoading , userPostList , setUserPostList } = useContext(UserContext)
    const {user,setUser} = useContext(AuthContext)

    const handleGetPosts = async (userId) =>{
        const response = await getPosts(userId);
        setUserPostList(response.posts)
    }

    useEffect(()=>{
        handleGetPosts(user._id)
    },[user])

    return (
        { user, loading , userPostList }
    )
}

export default useUser
