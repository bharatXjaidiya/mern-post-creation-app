import React, { useEffect, useState } from 'react'
import "../styles/postCard.scss"
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import usePostActions from '../hooks/usePostActions';


const PostCard = ({ postId, imageUrl, user, caption, description, likeCount, commentCount, isLiked }) => {

  const { handleLikePost, handleGetAllLikes, handleGetAllComments, handleCommentPost, handleDeleteComment } = usePostActions();
  const [Liked, setLiked] = useState(isLiked)
  let [likedCount, setlikedCount] = useState(likeCount)
  const [showLikePopup, setShowLikePopup] = useState(false)
  const [likeList, setLikeList] = useState([])

  const [showCommentPopup, setShowCommentPopup] = useState(false)
  const [comment, setComment] = useState("")
  const [commentList, setCommentList] = useState([])
  const [commentedCount, setCommentedCount] = useState(commentCount)

  // useEffect(() => {
  //   setLiked(isLiked)
  // }, [])


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
    setShowCommentPopup(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCommentPost(postId, comment)
    handleCommentPopup()
    setCommentedCount(prev => prev + 1)
  }

  const handleCommentPopup = async (e) => {
    const response = await handleGetAllComments(postId);
    setCommentList(response)
    setShowCommentPopup(true)
    setComment("")
    setShowLikePopup(false)
  }

  const handleDeleteCommentClick = async (commentId) => {
    await handleDeleteComment(commentId);
    const response = await handleGetAllComments(postId);
    setCommentList(response)
    setCommentedCount(prev => prev - 1)


  }

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
          <FaRegComment className='comment-icon' onClick={(e) => { handleCommentPopup(e) }} />
          <p>{commentedCount}</p>
        </div>
        <div className="share">
          <IoShareOutline className='share-icon' />
        </div>
      </div>

      <div style={{ bottom: showLikePopup ? "0" : "-90%" }} className='like-popup'>
        <button onClick={() => {
          setShowLikePopup(false)
        }}>X</button>
        <p className='heading'>Liked By</p>
        <div className="all-like-components">
          {likeList.length > 0 ? likeList.map((e) => {
            return (
              <div key={e._id} className='like-component'>
                <img src={e.userId.profilePic} alt="" />
                <p className="like-component-name">
                  {e.userId.name}
                </p>
              </div>
            )
          }) : <h2>No one liked this post yet.</h2>}
        </div>

      </div>

      <div style={{ bottom: showCommentPopup ? "0" : "-90%" }} className="comment-popup">
        <button className='close' onClick={() => {
          setShowCommentPopup(false)
        }}>X</button>
        <div className="all-comment-components">
          <p className="heading">Comments</p>

          {
            commentList.length > 0 ?
              commentList.map((comment) => {
                return (<div key={comment._id} className="comment-component">
                  <div className="comment-component-left">
                    <img src={comment.userId.profilePic} alt="" />
                  </div>

                  <div className="comment-component-right">
                    <p className="name">
                      {comment.userId.name}
                    </p>
                    <div className="comment">
                      {comment.comment}
                    </div>
                  </div>

                  <div className="comment-component-delete">
                    <AiOutlineDelete onClick={() => { handleDeleteCommentClick(comment._id) }} className='delete' />
                  </div>
                </div>)
              }) : <h3 className='comment-message'>No Comments Yet.</h3>
          }
        </div>


        <form onSubmit={(e) => { handleSubmit(e) }} className="comment-input">
          <input onChange={(e) => {
            setComment(e.target.value)
          }} value={comment} type="text" name='comment' id='comment' placeholder='Enter Comment' />
          <button className='submit'>Comment</button>
        </form>


      </div>

    </div>
  )
}

export default PostCard
