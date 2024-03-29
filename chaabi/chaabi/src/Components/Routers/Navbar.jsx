import React from 'react'
import { Link } from 'react-router-dom'
import styles from "../Styles/navbar.css"
import { useSelector } from 'react-redux'

export const Navbar = () => {
  const isAuth=useSelector((store)=>store.LoginReducer.isAuth)
  const token=JSON.parse(localStorage.getItem("token"))
  
  return (
    <div id="navbar">
        <Link to="/" >Home</Link>
        <p
        id="gpl"
        onClick={()=>{
          
          isAuth||token?window.location.href="/game":window.location.href="/login"
        }} >Game</p>
        {
          isAuth||token?<Link to="/profile" >Profile</Link>:<Link to="/login" >Login</Link>
        }
       
    </div>
  )
}
