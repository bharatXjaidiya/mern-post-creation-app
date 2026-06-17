import React, { useEffect, useState } from 'react'
import "../styles/postCard.scss"
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import usePost from '../hooks/usePost';


const PostCard = ({ postId, imageUrl, user, caption, description, likeCount, commentCount, isLiked }) => {
  const { handleLikePost, handleGetAllLikes } = usePost();
  const [Liked, setLiked] = useState(null)
  let [likedCount, setlikedCount] = useState(likeCount)
  const [showLikePopup, setShowLikePopup] = useState(false)
  const [likeList, setLikeList] = useState([])

  useEffect(() => {
    setLiked(isLiked)
  }, [])


  const onLikeHandle = async () => {
    const response = await handleLikePost(postId)
    if (response === "Post liked") {
      setLiked(true)
      setlikedCount(prev => prev + 1)
    }
    else {
      setLiked(false)
      setlikedCount(prev => prev - 1)
    }
  }

  const handleLikePopup = async () => {
    setShowLikePopup(prev => !prev);
    const response = await handleGetAllLikes(postId);
    setLikeList(response);
  }

  console.log(likeList)

  return (
    <div style={{ backgroundImage: `url(${imageUrl})` }} className='post'>

      <div className="post-bottom">
        <div className="post-bottom-top">
          <img src={user.profilePic} alt="" />
          <div className="username">{user.name}</div>
        </div>
        <div className="post-bottom-bottom">
          <div className="caption">{caption}</div>
          <div className="description">{description}</div>
        </div>
      </div>
      <div className="post-right">
        <div className="like">
          <FaRegHeart onClick={(e) => { onLikeHandle(e) }} className={`like-icon ${Liked ? "liked" : ""}`} />
          <p onClick={() => {
            handleLikePopup()
          }} >{likedCount}</p>
        </div>
        <div className="comment">
          <FaRegComment className='comment-icon' />
          <p>{commentCount}</p>
        </div>
        <div className="share">
          <IoShareOutline className='share-icon' />
        </div>
      </div>

      <div style={{bottom : showLikePopup ? "0" : "-90%"}}  className='like-popup'>
        <h3>Liked By</h3>
        <div className="all-like-components">
          {likeList.length > 0 ? likeList.map((e) => {
            return (
              <div className='like-component'>
                <img src={e.userId.profilePic} alt="" />
                <p className="like-component-name">
                  {e.userId.name}
                </p>
              </div>
            )
          }) : <h2>No one liked this post yet.</h2>}
        </div>

      </div>

    </div>
  )
}

export default PostCard
