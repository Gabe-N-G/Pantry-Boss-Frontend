import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function DispenserCard(props) {

  const [dispeners, setDispeners] = useState(null)

  const fetchPantryByFloor =  async () =>{
    try {
      const res = await axios.get(`http://localhost:8000/api/dispensers/?pantry=${props.pantryId}`)
      console.log(res.data)
      setDispeners(res.data)
    } catch (error) {
      console.error('Error fetching pantries:', error);
    }
  }

  useEffect(() => {
    fetchPantryByFloor();
  }, [props.pantryId]);

  const translation = {
    DR: "Drink",
    SN: "Snack",
    CO: "Coffee"
  }

  const addDispenerToPantry = as = {
    
  }



  return (
    <div className='twin-card'>DispenserCard
      {dispeners ? (
        dispeners.map((d)=>(
          <div key={d.id}>
            <p>Type: {translation[d.type]}</p> 
            <p>{d.current_level}/{d.max_capacity}</p>
            <Link to={`/dispenser/${d.id}`}>View Dispenser</Link>
          </div>
        ))
      ):(
        <p>Select a Pantry to see its dispensers</p>
      )}
      <hr/>
      <p>Add Dispenser</p>
      {/* <form onSubmit={} className="add-dispener-form">
        <input
          type="text"
          name="name"
          // value={pantryForm.name}
          // onChange={handleChange}
          placeholder="Enter pantry name"
          required
        />
        <button type="submit">Add Pantry</button>
      </form> */}
    </div>
  )
}

export default DispenserCard