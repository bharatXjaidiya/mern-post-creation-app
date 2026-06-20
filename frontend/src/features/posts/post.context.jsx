import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({children}) =>{
    const [allUserList, setAllUserList] = useState([])
    const [allPostList, setAllPostList] = useState([])
    const [loading , setLoading] = useState(false)
    const [user,setUser] = useState({});
    
    return (
        <PostContext.Provider value={{ allUserList, setAllUserList, allPostList, setAllPostList , loading ,setLoading }}>
            {children}
        </PostContext.Provider>
    )
}