import React, { useContext , useEffect } from 'react'
import { UserContext } from '../user.context'
import { getPosts, getUserProfile } from '../services/user.api'
import { AuthContext } from '../../auth/auth.context'

const useUser = () => {
    const { userProfile, setUserProfile, loading, setLoading , userPostList , setUserPostList } = useContext(UserContext)
    const {user,setUser} = useContext(AuthContext)

    const handleGetPosts = async (userId) =>{
        const response = await getPosts(userId);
        setUserPostList(response.posts)
    }

    const handleGetUserProfile = async (userId) =>{
        setLoading(true)
        const response = await getUserProfile("6a1923395e0daf8e5355fd9c")
        setUserProfile(response.userProfile)
        setLoading(false)
    }

    useEffect(()=>{
        handleGetUserProfile();
    },[])

    return (
        { userProfile, loading , userPostList }
    )
}

export default useUser
