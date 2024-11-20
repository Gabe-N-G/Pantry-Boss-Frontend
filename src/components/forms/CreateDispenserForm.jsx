import React from 'react'
import { useState } from 'react';
import { useParams, redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';


function CreateDispenserForm() {
    const [form,setForm] = useState({
        type: "CO",
        max_capacity: "",
        current_level: "",
        threshold: "",
        pantry: ""
    })

    const navigate = useNavigate()

    let {pantryId} = useParams()

      const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
          ...prevForm,
          [name]: value,
          pantry: pantryId,
          current_level: form.max_capacity
        }));
      };
      console.log(form)
    
      const addDispenserOnFloor = async (e) =>{
        e.preventDefault()
        try {
          await axios.post('http://localhost:8000/api/dispensers/',form)
          navigate('/dashboard')
        } catch (error) {
          console.error('Error creating dispensers:', error);
        }
      }


    
  return (
    <div className='home-card'>
        <p>Add Dispeners</p>
        <form onSubmit={addDispenserOnFloor} className="add-dispener-form">
            <label htmlFor="type">Select Dispenser Type</label>
            <br/>
            <select name="type" id="Type select" onChange={handleChange} >
                <option value="CO" >Coffee</option>
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
    </div>
  )
}

export default CreateDispenserForm