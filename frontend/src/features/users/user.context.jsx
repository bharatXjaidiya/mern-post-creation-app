import { createContext , useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) =>{

    const [profileUser, setProfileUserUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [userPostList, setUserPostList] = useState([])

    return (
        <UserContext.Provider value={{profileUser,setProfileUserUser,loading,setLoading,userPostList,setUserPostList}}>
            {children}
        </UserContext.Provider>
    )
}