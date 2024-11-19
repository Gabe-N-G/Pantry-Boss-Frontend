import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'

function DispenserCard(props) {

  const [dispeners, setDispeners] = useState(null)

  const fetchPantryByFloor =  async () =>{
    try {
      const res = await axios.get(`http://localhost:8000/api/dispensers/?pantry_id=${props.pantryId}`)
      console.log(res.data)
      setDispeners(res.data)
    } catch (error) {
      console.error('Error fetching pantries:', error);
    }
  }


  useEffect(() => {
    fetchPantryByFloor();
  }, [props.pantryId]);


  return (
    <div className='twin-card'>DispenserCard
     {dispeners ? (
      dispeners.map((d)=>(
        <div key={d.id}>Type:{d.type} {d.current_level}/{d.max_capacity}</div>
      ))
     ):(
      <p>loading...</p>
     )}
    
    </div>
  )
}

export default DispenserCard