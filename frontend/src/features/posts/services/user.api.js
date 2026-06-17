import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000/api/",
    withCredentials : true
})

export const getAllUsers = async() =>{
    const response = await api.get("user/getAllUsers");
    
    return response.data;
}

