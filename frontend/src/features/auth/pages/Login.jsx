import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import useAuth from "../hooks/useAuth"

const Login = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginWith, setLoginWith] = useState("username")
    const { user, loading, handleLogin } = useAuth();
    const navigate = useNavigate()

    const handleChange = (e) => {
        if (e.target.name === "username") {
            setUsername(e.target.value)
        }
        else if (e.target.name === "email") {
            setEmail(e.target.value)
        }
        else {
            setPassword(e.target.value)
        }
    }

    const submit = async (e) => {
        e.preventDefault();
        await handleLogin(username, email, password);

        navigate('/')
    }

    return (
        <main id='login' >
            <form onSubmit={(e) => { submit(e) }} >
                <h1>Login</h1>
                {loginWith === "username" ? <input onChange={(e) => { handleChange(e) }} type="text" name='username' id='username' placeholder='Enter username' value={username} /> : <input onChange={(e) => { handleChange(e) }} type="text" name='email' id='email' placeholder='Enter email' value={email} />}

                <input onChange={(e) => { handleChange(e) }} type="text" name='password' id='password' placeholder='Enter password' value={password} />

                <button>Login</button>
                <p onClick={() => { loginWith === "username" ? setLoginWith("email") : setLoginWith("username") }} className='login-with'>Login with {loginWith === "username" ? "email" : "username"}</p>
                <div className="form-bottom">
                    <p>Don't have an account?</p> <Link to={'/register'}>Register</Link>
                </div>
            </form>

        </main>
    )
}

export default Login

