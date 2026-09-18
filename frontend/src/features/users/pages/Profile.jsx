import React, { useContext, useState, useEffect } from 'react'
import useUser from '../hooks/useUser'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router"
import "../styles/profile.scss";
import PostCard from "../../posts/components/PostCard";
import { AuthContext } from '../../auth/auth.context';
import { saveEdit, unfollow } from '../services/user.api';

const Profile = () => {
  const { userProfile, loading, handleGetMe, userPostList, handleGetFollowList, followList, handleFollow, handleUnfollow, followers, followings, isFollowed, setIsFollowed, setFollowList, handleSaveEdit , setUserProfile } = useUser();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  const isProfileOwner = userId === user._id;
  const [show, setShow] = useState("posts")
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio,
    profilePic: null,   // File object, only set if user picks a new one
    banner: null
  });


  const follow = async (userId) => {
    const response = await handleFollow(userId);
  }
  const unfollow = async (userId) => {
    const response = await handleUnfollow(userId);
  }
  const handleSave = async (userId) => {
    const response = await handleSaveEdit(userId, formData); // your API call

    setUserProfile(response.updatedUser); // or response.data.updatedUser
  }

  if ((userProfile === null) || loading) {
    return <h1>Fetching User...</h1>
  }

  return (
    <main id='Profile'>
      <section className='section-1' >
        {isEditing ? (
          <div className='edit-form'>

            <label htmlFor="banner-upload" className='edit-form-banner'
              style={{
                backgroundImage: `url(${formData.banner ? URL.createObjectURL(formData.banner) : userProfile.banner})`
              }}
            >

              <span className="edit-overlay">Change Banner</span>
              <input
                id="banner-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, banner: e.target.files[0] })}
                hidden
              />
            </label>

            <label htmlFor="profilepic-upload" className='edit-form-profile-pic'
              style={{
                backgroundImage: `url(${formData.profilePic ? URL.createObjectURL(formData.profilePic) : userProfile.profilePic})`
              }}
            >
              <span className="edit-overlay">Change Photo</span>
              <input
                id="profilepic-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, profilePic: e.target.files[0] })}
                hidden
              />
            </label>

            <input className='edit-form-name'
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <input className='edit-form-bio'
              type="text"
              placeholder="Write a short bio..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
            <div className="edit-form-buttons">
              <button onClick={() => { handleSave(userId, formData) }}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </section>

      <section className="section-2">
        <div className="section-2-post">
          <p>{userPostList.length}</p>
          <div>posts</div>
        </div>
        <hr />
        <div className="section-2-follower">
          <p>{followers?.length ?? 0}</p>
          <div>followers</div>
        </div>
        <hr />
        <div className="section-2-following">
          <p>{followings?.length ?? 0}</p>
          <div>following</div>
        </div>
      </section>

      {isProfileOwner ? <section style={{ display: isEditing ? "none" : "flex" }} className="section-3"><button onClick={() => { setIsEditing(true) }}>Edit</button></section> : <section className="section-3">
        {isFollowed ? <button onClick={() => { unfollow(userId) }}>Unfollow</button> : <button onClick={() => { follow(userId) }}>Follow</button>}
      </section>}

      <section className="section-4">
        <div className="section-4-top">
          <p style={{ backgroundColor: show === "posts" ? "#FF5722" : "black" }} onClick={() => { setShow("posts") }} >posts</p>
          <p style={{ backgroundColor: show === "followers" ? "#FF5722" : "black" }} onClick={() => { setShow("followers") }}>followers</p>
          <p style={{ backgroundColor: show === "followings" ? "#FF5722" : "black" }} onClick={() => { setShow("followings") }}>following</p>
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
              }) : <h3>No one follow's {user.name}</h3>
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
                  <button onClick={() => { unfollow(e._id) }}>Unfollow</button>
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
