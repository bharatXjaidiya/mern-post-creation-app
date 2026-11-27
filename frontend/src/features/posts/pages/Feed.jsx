import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import PostCard from '../components/PostCard'
import Footer from '../components/Footer'
import usePost from '../hooks/usePost'
import StoryCircle from '../components/StoryCircle'
import "../styles/feed.scss"
import Loading from '../../../shared/Loading'
import useUser from '../../users/hooks/useUser'
import { useNavigate } from 'react-router'


const Feed = () => {

    const { allPostList, handleGetAllPosts, loading, user } = usePost();
    const {allUserList , handleGetAllUsers} = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        handleGetAllUsers();
        handleGetAllPosts();
    }, []);



    if (!user) {
        setTimeout(() => {
            return <Loading text='Please Login First' />
        }, 2000);
        setTimeout(() => {
            return <Loading text='Redirecting to Login Page' />
        }, 2000);

        navigate("/login")
    }
    if (loading) {
        return <Loading text='Fetching Feed' ></Loading>
    }

    return (
        <main id="feed">
            <Navbar profilePic={user.profilePic} />

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
                            <PostCard key={post._id} postId={post._id} user={post.userId} imageUrl={post.imageUrl} caption={post.caption} description={post.description} likeCount={post.likeCount} commentCount={post.commentCount} isLiked={post.isLiked} />
                        ))
                        : <h1>No post available now</h1>
                }
            </div>

            <Footer />
        </main>
    )
}

export default Feed
