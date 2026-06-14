import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000/api/post",
    withCredentials :true
})

export const getAllPosts = async () => {
    const response = await api.get("/");
    return response.data;
}

