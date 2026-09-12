import { createContext , useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) =>{

    const [userProfile, setUserProfile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [userPostList, setUserPostList] = useState([])

    return (
        <UserContext.Provider value={{userProfile,setUserProfile,loading,setLoading,userPostList,setUserPostList}}>
            {children}
        </UserContext.Provider>
    )
}