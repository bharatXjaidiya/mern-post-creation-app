import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import "../style/form.scss"
import useAuth from '../hooks/useAuth'

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {user,loading,handleRegister} = useAuth();
  const navigate = useNavigate();

  const handleInput = (e)=>{
    if(e.target.name === "username"){
      setUsername(e.target.value)
    }
    else if(e.target.name === "email"){
      setEmail(e.target.value)
    }
    else{
      setPassword(e.target.value)
    }
  }

  const handleSubmit= async(e)=>{
    e.preventDefault();
    await handleRegister(username,email,password)
    navigate('/login')

  }

  if(loading){
    return <h1>Loading...</h1>
  }

  return (
    <main id='register' >
      <form onSubmit={(e)=>{handleSubmit(e)}} >
      <h1>Register</h1>
        <input onChange={(e)=>{handleInput(e)}} type="text" name='username' id='username' placeholder='Enter username' value={username} />
        <input onChange={(e)=>{handleInput(e)}} type="text" name='email' id='email' placeholder='Enter email' value={email} />
        <input onChange={(e)=>{handleInput(e)}} type="text" name='password' id='password' placeholder='Enter password' value={password} />
        <button>Register</button>
        <div className="form-bottom">
          <p>Already having an account?</p> <Link to={'/login'}>Login</Link>
        </div>
      </form>
    </main>
  )
}

export default Register
