import React from 'react'
import "../styles/storyCircle.scss" 
const StoryCircle = ({name,profilePic}) => {
  return (
    <div className="story">
        <div className="circle">
            <img src={profilePic} alt="" />
        </div>
        <div className="name">
            {name}
        </div>
    </div>
  )
}

export default StoryCircle
