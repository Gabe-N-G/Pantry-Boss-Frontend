import React from 'react'
import './Home.css'


function Home() {
  return (
    <>
      <main>
        <div className='home-card'>
          <h1>Welcome to Pantry Boss</h1>
          <h2>A building pantry management app</h2>
          <br/>
          <div className='home-buttons'>
            <button>Sign up</button>
            <button>Sign in</button>
          </div>

        </div>
      </main>     
    </>
  )
}

export default Home