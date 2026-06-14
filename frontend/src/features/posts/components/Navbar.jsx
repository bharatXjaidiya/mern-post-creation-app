import React, { useContext } from 'react'
import logo from "../../../assets/logo.png"
import "../styles/navbar.scss"
import { AuthContext } from '../../auth/auth.context'

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="nav-left">
        <img src={logo} alt="" className="logo" />
        <div className="title">Pixora</div>
        </div>
        <img src={"https://i.pinimg.com/1200x/9a/3c/fa/9a3cfa17b148fcf02131eb4c62fff057.jpg"} alt="" className="profile-pic" />
    </div>
  )
}

export default Navbar
