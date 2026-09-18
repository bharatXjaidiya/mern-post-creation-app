import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export const getUserProfile = async (userId) => {

    const response = await api.get("/api/user/" + userId);

    return response.data;
}

export const getUserPosts = async (userId) => {
    const response = await api.get("/api/post/getPosts/" + userId);
    return response.data;
}

export const getFollowList = async (userId) => {
    const response = await api.get("/api/user/getFollowList/" + userId)

    return response.data;
}


export const follow = async (followeeId) => {
    const response = await api.post("/api/user/follow/" + followeeId);

    return response.data;
}
export const unfollow = async (followeeId) => {
    const response = await api.delete("/api/user/unfollow/" + followeeId);

    return response.data;
}

export const saveEdit = async (userId,data) =>{
    const d = new FormData();
    d.append("name", data.name);
    d.append("bio", data.bio);
    if (data.profilePic) d.append("profilePic", data.profilePic);
    if (data.banner) d.append("banner", data.banner);

    const response = await api.patch("/api/user/edit/" + userId,data);

    return response.data;
}