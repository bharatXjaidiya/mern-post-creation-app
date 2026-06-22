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

export const commentPost = async (postId,comment) =>{
    const response = await api.post("/post/comment/" + postId ,{comment});

    return response.data;
}

export const getAllComments = async (postId) =>{
    const response = await api.get("/post/getAllComments/" + postId);

    return response.data;
}

export const deleteComment = async(commentId) =>{
    const response = await api.delete("/post/comment/" + commentId);

    return response
}

export const createPost = async(caption,description,image) => {
    const formData = new FormData();
    formData.append("image",image);
    formData.append("caption",caption);
    formData.append("description",description);

    const response = await api.post("/post/create",formData);

    return response.data;

}