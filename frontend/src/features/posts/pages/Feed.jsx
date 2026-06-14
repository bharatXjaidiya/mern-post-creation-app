import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import PostCard from '../components/PostCard'
import Footer from '../components/Footer'
import usePost from '../hooks/usePost'
import { getAllUsers } from '../services/user.api'
import StoryCircle from '../components/StoryCircle'
import "../styles/feed.scss"


const Feed = () => {
    const { allUserList, allPostList, handleGetAllUsers, handleGetAllPosts, loading, user } = usePost();

    useEffect(() => {
        handleGetAllUsers();
        handleGetAllPosts();
    }, []);


    if (loading) {
        return <h1>Loading....</h1>
    }

    return (
        <main id="feed">
            <Navbar />

            <div className="stories">
                {allUserList?.length > 0
                    ? allUserList.map((user) => {
                        return <StoryCircle key={user._id} name={user.name} profilePic={user.profilePic} />
                    })
                    : <h1>No user available now</h1>}
            </div>

            <div className="posts">
                {
                    allPostList?.length > 0
                        ? allPostList.map((post) => (
                            <PostCard key={post._id} imageUrl={post.imageUrl} caption={post.caption} description = {post.description} likeCount = {post.likeCount} commentCount={post.commentCount} />
                        ))
                        : <h1>No post available now</h1>
                }
            </div>

            <Footer />
        </main>
    )
}

export default Feed
