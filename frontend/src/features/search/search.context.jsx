import { useState } from "react"
import { createContext } from "react"

const SearchContext = createContext()

export const SearchProvider = ({children}) =>{
    const [search, setsearch] = useState("")

    return(
        <SearchContext.Provider value={{search}}>
            {children}
        </SearchContext.Provider>
    )
}



