import React from 'react'
import { Link } from 'react-router'

const Register = () => {
  return (
    <main id='register' >
        <form >
            <input type="text" name='username' id='username' placeholder='Enter username' value={"ehll"} />
            <input type="text" name='email' id='email' placeholder='Enter email' value={"email"} />
            <input type="text" name='password' id='password' placeholder='Enter password' value={"passoword"} />
            <button>Register</button>
            <p>Already having an account?</p> <Link to={'/login'}>Login</Link>
        </form>
    </main>
  )
}

export default Register
