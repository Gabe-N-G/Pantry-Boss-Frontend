import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'


// TODO: Actually pass the user into the navbar 
function NavBar({user}) {
  return (
    <>
      <nav>
        <div className='navbar-title'>PantryBoss</div>
        <div className='links'>
          <Link> About </Link>
          <Link> Sign In </Link>
          <Link> Sign Up </Link>
        </div>


      </nav>
    </>
  )
}

export default NavBar