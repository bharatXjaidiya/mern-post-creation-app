import React from 'react'
import "../styles/postCard.scss"
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";


const PostCard = ({ imageUrl, caption, description, likeCount, commentCount }) => {
  return (
    <div style={{ backgroundImage: `url(${imageUrl})` }} className='post'>
      <div className="post-bottom">
        <div className="post-bottom-top">
          <img src={imageUrl} alt="" />
          <div className="username">bharat</div>
        </div>
        <div className="post-bottom-bottom">
          <div className="caption">{caption}</div>
          <div className="description">{description}</div>
        </div>
      </div>
      <div className="post-right">
        <div className="like">
          <FaRegHeart className='like-icon' />
          <p>{likeCount}</p>
        </div>
        <div className="comment">
          <FaRegComment className='comment-icon' />
          <p>{commentCount}</p>
        </div>
        <div className="share">
          <IoShareOutline className='share-icon' />
        </div>
      </div>
    </div>
  )
}

export default PostCard
