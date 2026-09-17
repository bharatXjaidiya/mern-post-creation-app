import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [userProfile, setUserProfile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [userPostList, setUserPostList] = useState([])
    const [followList, setFollowList] = useState([])
    const [followers, setFollowers] = useState(null)
    const [isFollowed, setIsFollowed] = useState(false)
    const [followings, setFollowings] = useState(null)

    return (
        <UserContext.Provider value={{ userProfile, setUserProfile, loading, setLoading, userPostList, setUserPostList, followList, setFollowList, followers, setFollowers, followings, setFollowings, isFollowed, setIsFollowed }}>
            {children}
        </UserContext.Provider>
    )
}