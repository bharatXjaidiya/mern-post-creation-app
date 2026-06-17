import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000/api/",
    withCredentials :true
})

export const getAllPosts = async () => {
    const response = await api.get("post/");
    return response.data;
}

export const likePost = async (postId) =>{
    const response = await api.get("post/like/" + postId);
    return response.data;
}

export const getAllLikes = async (postId) =>{
    const response = await api.get("post/getAllLikes/" + postId);

    return response.data;
}