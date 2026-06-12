import React from 'react'
import { Link } from 'react-router'

const Login = () => {
    return (
        <main id='login' >
            <form >
                <input type="text" name='username' id='username' placeholder='Enter username' value={"ehll"} />
                <input type="text" name='email' id='email' placeholder='Enter email' value={"email"} />
                <input type="text" name='password' id='password' placeholder='Enter password' value={"passoword"} />
                <button>Login</button>
            </form>
            <p>Don't have an account?</p> <Link to={'/register'}>Register</Link>

        </main>
    )
}

export default Login

