import React from 'react'
import { commentPost, createPost, deleteComment, getAllComments, getAllLikes, getAllPosts, likePost } from "../services/post.api"

const usePostActions = () => {
    const handleLikePost = async (postId) => {
        const response = await likePost(postId);

        return response.message;
    }

    const handleGetAllLikes = async (postId) => {
        const response = await getAllLikes(postId)

        return response.allLikes
    }

    const handleCommentPost = async (postId, comment) => {
        const response = await commentPost(postId, comment);

        return response.comment;
    }

    const handleGetAllComments = async (postId) => {
        const response = await getAllComments(postId);

        return response.allComments;
    }

    const handleDeleteComment = async (commentId) => {
        const response = await deleteComment(commentId);

        return response.message;
    }

     return {
     handleLikePost, handleGetAllLikes, handleGetAllComments, handleCommentPost, handleDeleteComment
    }
}

export default usePostActions
