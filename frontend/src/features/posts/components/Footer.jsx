import React, { useContext } from 'react'
import { IoHome, IoHomeOutline } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import "../styles/footer.scss"
import {useNavigate} from "react-router"
import { AuthContext } from '../../auth/auth.context';

const Footer = () => {

  const navigate = useNavigate()
  const {user} = useContext(AuthContext)


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
        <AiFillPlusCircle onClick={()=>{navigate('/create-post')}} className = "icon create-icon" />
        <p>create</p>
      </div>

      <div className="message">
        <AiOutlineMessage className = "icon" />
        <p>Message</p>
      </div>

      <div onClick={()=>{navigate(`/profile/${user._id}`)}} className="profile">
        <CgProfile className = "icon" /> 
        <p>Profile</p>
      </div>
    </div>
  )
}

export default Footer
