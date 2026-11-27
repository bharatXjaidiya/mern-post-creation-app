import React from 'react'
import "../styles/search.scss"

const Search = () => {
  return (
    <main id="search">
        <div className="search-bar">
            <input type="text" name="search-bar" id="search-bar" />
        </div>
        <div className="results">
            results
        </div>
        <div className="recent">
            recent
        </div>
    </main>
  )
}

export default Search
