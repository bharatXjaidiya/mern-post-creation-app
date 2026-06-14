import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({children}) =>{
    const [allUserList, setAllUserList] = useState(null)
    const [allPostList, setAllPostList] = useState(null)
    
    return (
        <PostContext.Provider value={{ allUserList, setAllUserList, allPostList, setAllPostList }}>
            {children}
        </PostContext.Provider>
    )
}