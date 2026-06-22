import React, { useContext } from 'react'
import logo from "../../../assets/logo.png"
import "../styles/navbar.scss"
import { AuthContext } from '../../auth/auth.context'

const Navbar = ({profilePic}) => {
  return (
    <div className="navbar">
        <div className="nav-left">
        <img src={logo} alt="" className="logo" />
        <div className="title">Pixora</div>
        </div>
        <img src={profilePic} alt="" className="profile-pic" />
    </div>
  )
}

export default Navbar
