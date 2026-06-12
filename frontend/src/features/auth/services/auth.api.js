import axios from "axios"

const api = axios.create({
    baseURL : "http://localhost:3000/api/auth",
    withCredentials : true //able to read the tokens form the cookies
})

export const register = async(name,email,password) =>{
    const response = await api.post("/register",{name,email,password});

    return response.data;
}

export async function login(name,email,password){
    const response = await api.post("/login",{name,email,password})

    return response.data;
}

export async function getMe(){
    const response = await api.get("/getMe");

    return response.data;
}

export async function logout(){
    const response  = await api.get("/logout");

    return response.data;
}
