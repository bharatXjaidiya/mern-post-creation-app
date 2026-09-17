import React, { useContext, useEffect } from 'react'
import { UserContext } from '../user.context'
import { getUserPosts, getUserProfile, getFollowList, follow, unfollow } from '../services/user.api'
import { useParams } from 'react-router'
import { AuthContext } from '../../auth/auth.context'

const useUser = () => {
    const { userProfile, setUserProfile, loading, setLoading, userPostList, setUserPostList, followList, setFollowList, followers, setFollowers, followings, setFollowings, isFollowed, setIsFollowed } = useContext(UserContext)
    const { userId } = useParams()
    const { user } = useContext(AuthContext)

    const handleGetUserProfile = async (userId) => {
        setLoading(true)
        const response = await getUserProfile(userId)
        setUserProfile(response.userProfile)
        setLoading(false)
    }

    const handleGetUserPosts = async (userId) => {
        setLoading(true)
        const response = await getUserPosts(userId);
        setUserPostList(response.posts);
        setLoading(false)
    }

    const handleGetFollowList = async (userId) => {
        setLoading(true);
        try {
            const response = await getFollowList(userId);
            const list = response?.followList ?? [];

            setFollowList(list);

            const followers = [];
            const followings = [];
            let followed = false;

            list.forEach((e) => {
                const followeeId = e.followeeId._id.toString();
                const followerId = e.followerId._id.toString();

                if (followeeId === userId.toString()) {
                    followers.push(e.followerId);
                } else if (followerId === userId.toString()) {
                    followings.push(e.followeeId);
                }

                // Independent check: does the logged-in user follow this profile?
                if (followerId === user._id.toString() && followeeId === userId.toString()) {
                    followed = true;
                }
            });

            setFollowers(followers);
            setFollowings(followings);
            setIsFollowed(followed);

        } catch (err) {
            console.error("Failed to fetch follow list:", err);
            setFollowList([]);
            setFollowers([]);
            setFollowings([]);
            setIsFollowed(false);
        } finally {
            setLoading(false);
        }
    }

    const handleFollow = async (userId) => {
        setLoading(true)
        const response = await follow(userId);
        await handleGetFollowList(userId)
        setLoading(false)
        return response.followRecord;
        
    }

    const handleUnfollow = async (userId) => {
        setLoading(true)
        const response = await unfollow(userId);
        await handleGetFollowList(userId)
        setLoading(false)
    }


    useEffect(() => {
        handleGetFollowList(userId);
        handleGetUserProfile(userId);
        handleGetUserPosts(userId);

    }, [])

    return (
        { userProfile, loading, userPostList, handleGetFollowList, followList, setFollowList, handleFollow, handleUnfollow, followers, followings, isFollowed, setIsFollowed }
    )
}

export default useUser
