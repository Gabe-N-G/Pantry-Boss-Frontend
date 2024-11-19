import React from 'react'
import { useState } from 'react'
import axios from 'axios'

// TODO: Destructure props
function PantryCard(props) {
  console.log(props.pantrys)

  const [pantryForm,setPantryForm] = useState({
    name: "",
    floor: ""
  })

  // floor: props.pantrys[0].floor

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPantryForm((prevForm) => ({
      ...prevForm,
      [name]: value,
      floor: props.floorId
    }));
    console.log(pantryForm)
  };

  const addPantryOnFloor =  async (e) =>{
    e.preventDefault()
    try {
      await axios.post(`http://localhost:8000/api/pantries/`, pantryForm)
      props.fetchPantryByFloor()
    } catch (error) {
      console.error('Error creating pantry:', error);
    }
  }


  return (
    <div className='twin-card'>PantryCard
      {props.pantrys ? (
        props.pantrys.map((pant)=>(
            <button key={pant.id} id={pant.id} onClick={props.selectPantry}>{pant.name}</button>
        ))
      ) : (
        <p>Now loading</p>
      )}
      <hr/>
      <p>Add Pantry:</p>
      <form onSubmit={addPantryOnFloor} className="add-floor-form">
        <input
          type="text"
          name="name"
          value={pantryForm.name}
          onChange={handleChange}
          placeholder="Enter pantry name"
          required
        />
        <button type="submit">Add Pantry</button>
      </form>
    </div>
  )
}

export default PantryCard