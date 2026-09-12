import React, { useEffect } from 'react'
import useUser from '../hooks/useUser'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router"
import "../styles/profile.scss";
import PostCard from "../../posts/components/PostCard";
const Profile = () => {
  const { userProfile, loading, handleGetMe, userPostList } = useUser();
  const navigate = useNavigate();
  console.log(userProfile)
  
  if((userProfile === null) || loading){
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

      {userProfile.isOwner ? <section className="section-3"><button>Edit</button></section> : <section className="section-3">
        <button>Follow</button>
      </section> } 

      <section className="section-4">
        <div className="section-4-top">
          <p>posts</p>
          <p>followers</p>
          <p>following</p>
        </div>

        <div className="section-4-bottom">
          {
            userPostList?.length > 0
              ? userPostList.map((post) => (
                <PostCard key={post._id} postId={post._id} user={post.userId} imageUrl={post.imageUrl} caption={post.caption} description={post.description} likeCount={post.likeCount} commentCount={post.commentCount} isLiked={post.isLiked} />
              ))
              : <h1>No post available now</h1>
          }
        </div>
      </section>

    </main>
  )
}

export default Profile
