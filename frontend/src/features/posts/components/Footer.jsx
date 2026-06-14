import React from 'react'
import { IoHome, IoHomeOutline } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import "../styles/footer.scss"

const Footer = () => {
  return (
    <div className='footer'>
      <div className="home">
        <IoHomeOutline  className = "icon" />
        <p>Home</p>
      </div>

      <div className="search">
        <GoSearch className='icon' />
        <p>Search</p>
      </div>

      <div className="create">
        <AiFillPlusCircle className = "icon create-icon" />
        <p>create</p>
      </div>

      <div className="message">
        <AiOutlineMessage className = "icon" />
        <p>Message</p>
      </div>

      <div className="profile">
        <CgProfile className = "icon" /> 
        <p>Profile</p>
      </div>
    </div>
  )
}

export default Footer
