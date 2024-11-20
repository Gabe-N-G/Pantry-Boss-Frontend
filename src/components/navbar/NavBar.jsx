import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NavBar.css'
import {signOut} from "../../services/authContext.js";




// TODO: Actually pass the user into the navbar
function NavBar({user}) {
  const navigate = useNavigate();
  function handleSignOut() {
    signOut()
    navigate("/signin");
  }
  return (
    <>
      <nav>
        <div className='navbar-title'>PantryBoss</div>
        <div className='links'>
          <Link to={"/about"}>About</Link>
          <Link to={"/signin"}>Sign in</Link>
          <Link to={"/signup"}>Sign up</Link>
          <Link to={"/signin"} onClick={handleSignOut} className="signout-button">
            Sign Out
          </Link>
        </div>
      </nav>
    </>
  )
}

export default NavBar