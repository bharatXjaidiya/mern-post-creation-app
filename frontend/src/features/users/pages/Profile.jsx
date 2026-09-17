import React, { useContext, useState, useEffect } from 'react'
import useUser from '../hooks/useUser'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router"
import "../styles/profile.scss";
import PostCard from "../../posts/components/PostCard";
import { AuthContext } from '../../auth/auth.context';
import { unfollow } from '../services/user.api';

const Profile = () => {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  const isProfileOwner = userId === user._id;
  const [show, setShow] = useState("posts")

  
  const { userProfile, loading, handleGetMe, userPostList, handleGetFollowList, followList, handleFollow, handleUnfollow, followers, followings, isFollowed, setIsFollowed , setFollowList } = useUser();
  const navigate = useNavigate();

  const follow = async (userId) =>{
    const response = await handleFollow(userId);
  }
  const unfollow = async (userId) =>{
    const response = await handleUnfollow(userId);
  }
  
  if ((userProfile === null) || loading) {
    return <h1>Fetching User...</h1>
  }

  return (
    <main id='Profile'>

      <section className="section-1">
        <div style={{ backgroundImage: `url(${userProfile.banner})` }} className="banner">
          <div onClick={() => { navigate("/") }} className="back-button">
            <FaArrowLeft className='back-button-img' />
          </div>
        </div>

        <div className="pic-name">
          <img src={userProfile.profilePic} alt="" />
          <p>{userProfile.name}</p>
          <p className="bio">{userProfile.bio}</p>
        </div>
      </section>

      <section className="section-2">
        <div className="section-2-post">
          <p>10</p>
          <div>posts</div>
        </div>
        <hr />
        <div className="section-2-follower">
          <p>96</p>
          <div>followers</div>
        </div>
        <hr />
        <div className="section-2-following">
          <p>55</p>
          <div>following</div>
        </div>
      </section>

      {isProfileOwner ? <section className="section-3"><button>Edit</button></section> : <section className="section-3">
        {isFollowed ? <button onClick={() => {unfollow(userId) }}>Unfollow</button> : <button onClick={() => {follow(userId)}}>Follow</button>}
      </section>}

      <section className="section-4">
        <div className="section-4-top">
          <p style={{ backgroundColor: show === "posts" ? "orange" : "black" }} onClick={() => { setShow("posts") }} >posts</p>
          <p style={{ backgroundColor: show === "followers" ? "orange" : "black" }} onClick={() => { setShow("followers") }}>followers</p>
          <p style={{ backgroundColor: show === "followings" ? "orange" : "black" }} onClick={() => { setShow("followings") }}>following</p>
        </div>

        <div className="section-4-bottom">
          {
            show === "posts" && (userPostList?.length > 0
              ? userPostList.map((post) => (
                <PostCard key={post._id} postId={post._id} user={post.userId} imageUrl={post.imageUrl} caption={post.caption} description={post.description} likeCount={post.likeCount} commentCount={post.commentCount} isLiked={post.isLiked} />
              ))
              : <h1>No post available now</h1>

            )
          }
          {
            show === "followers" && (
              followers.length > 0 ? followers.map((e) => {
                return (<div key={e._id} className="followers-component">
                  <img src={e.profilePic} alt="" />
                  <p className="name">
                    {e.name}
                  </p>

                </div>)
              })  : <h3>No one follow's {user.name}</h3>
            )
          }
          {
            show === "followings" && (
             followings.length > 0 ? followings.map((e) => {
                return (<div key={e._id} className="followings-component">
                  <img src={e.profilePic} alt="" />
                  <p className="name">
                    {e.name}
                  </p>
                  <button onClick={()=>{unfollow(e._id)}}>Unfollow</button>
                </div>)
              })
              : <h3>{user.name} don't follow anyone</h3>
            )
          }


        </div>
      </section>

    </main>
  )
}

export default Profile
