import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function DispenserCard(props) {

  const [dispeners, setDispeners] = useState(null)
  const [form,setForm] = useState({
    type: "",
    max_capacity: "",
    current_level: "",
    threshold: "",
    pantry: ""
  })

  const fetchDispenserByPantry =  async () =>{
    try {
      const res = await axios.get(`http://localhost:8000/api/dispensers/?pantry=${props.pantryId}`)
      console.log(res.data)
      setDispeners(res.data)
    } catch (error) {
      console.error('Error fetching dispensers:', error);
    }
  }

  const translation = {
    DR: "Drink",
    SN: "Snack",
    CO: "Coffee"
  }

  useEffect(() => {
    fetchDispenserByPantry();
  }, [props.pantryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
      pantry: props.pantryId,
      current_level: form.max_capacity
    }));
  };
  console.log(form)

  const addDispenserOnFloor = async (e) =>{
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/dispensers/',form)
      fetchDispenserByPantry()
    } catch (error) {
      console.error('Error creating dispensers:', error);
    }
  }


  return (
    <div className='twin-card'>DispenserCard
      {dispeners ? (
        dispeners.map((d)=>(
          <div key={d.id}>
            <p>Type: {translation[d.type]}</p> 
            <p>{d.current_level}/{d.max_capacity}</p>
            <Link to={`/dispensers/${d.id}`}>View Dispenser</Link>
          </div>
        ))
      ):(
        <p>Select a Pantry to see its dispensers</p>
      )}
      <hr/>
      {dispeners ? (
      <>
        <p>Add Dispeners</p>
        <form onSubmit={addDispenserOnFloor} className="add-dispener-form">
            <label htmlFor="type">Select Dispenser Type</label>
            <br/>
            <select name="type" id="Type select" onChange={handleChange} >
                <option value="CO">Coffee</option>
                <option value="DR">Drink</option>
                <option value="SN">Snack</option>
            </select>
            <br/>
            <label htmlFor="max_capacity">Input Disepnser Max Caapcity</label>
            <br/>
            <input
              type="number"
              name="max_capacity"
              value={form.max_capacity}
              onChange={handleChange}
              placeholder="Dispenser Capacity"
              required
            />
            <br/>
            <label htmlFor="threshold">Input Low Value Threshold</label>
            <br/>
            <input
              type="number"
              name="threshold"
              value={form.threshold}
              onChange={handleChange}
              placeholder="Threshold Value"
              required
            />
            <button type="submit">Add Dispenser</button>
        </form>
      </>
      ):(
      <p>Pick a pantry to add a dispenser to it</p>
      )}
    </div>
  )
}

export default DispenserCard

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