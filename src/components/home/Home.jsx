import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'


function Home() {
  return (
    <>
      <main>
        <div className='home-card'>
          <h1>Welcome to Pantry Boss</h1>
          <h3>A building pantry management app</h3>
          <br/>
          <div className='home-buttons'>
            <Link to={"/signup"}>Sign up</Link>
            <Link to={"/signin"}>Sign in</Link>
          </div>

        </div>
        
      </main>     
    </>
  )
}

export default Home