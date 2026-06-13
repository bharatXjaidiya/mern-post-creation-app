import { useContext } from "react";
import { register, login, getMe, logout } from "../services/auth.api";
import { AuthContext } from "../auth.context";

const useAuth = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext);

    const handleRegister = async(username,email,password)=>{
        setLoading(true);

        const response = await register(username,email,password);

        setUser(response.user);

        setLoading(false);
    }

    const handleLogin = async(username,email,password) =>{
        setLoading(true);

        const response = await login(username,email,password);

        setUser(response.user);

        setLoading(false);

    }

    return {
        user , loading , handleLogin , handleRegister
    }

}

export default useAuth
