import React from 'react'
import { Link } from 'react-router-dom'
import "./About.css"

function About() {
  return (
      <div className='home-card'>
        <h1>Mission Statement:</h1>
        <p>At Pantry Boss, our mission is to empower companies in NYC's high-rise buildings to create a welcoming and productive office environment by ensuring their pantries are always fully stocked. By leveraging cutting-edge IoT technology, we provide real-time insights to pantry managers, enabling them to efficiently monitor and replenish snacks and beverages across multiple floors. Our app seamlessly connects with existing sensor hardware, delivering accurate data to optimize pantry management and support companies in their efforts to enhance employee satisfaction and encourage a return to the office.</p>
        <div className='staff-section'>
          <h2>Our staff:</h2>
          <p>Paola Soria</p> 
          <p>Peter McKehnie</p>
          <p>Joey Pierre</p> 
          <p>Gabriel Gutierrez</p>
        </div>
        <Link className="back-button" to={"/"}>Back to Home</Link>
      </div>
  )
}

export default About