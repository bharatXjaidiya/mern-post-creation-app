import { createContext , useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) =>{

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [userPostList, setUserPostList] = useState([])

    return (
        <UserContext.Provider value={{user,setUser,loading,setLoading,userPostList,setUserPostList}}>
            {children}
        </UserContext.Provider>
    )
}