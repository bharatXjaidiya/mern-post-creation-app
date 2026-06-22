import axios from "axios"

const api = axios.create({
    baseURL : "http://localhost:3000",
    withCredentials : true
})


export const getPosts = async (userId) =>{
    const response = await api.get("/api/post/getPosts/" + userId);
    return response.data;
}

