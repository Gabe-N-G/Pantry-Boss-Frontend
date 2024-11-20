// import React from 'react'
import { useState } from 'react';
import { useParams, redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreatePantryForm() {
        const [pantryForm,setPantryForm] = useState({
            name: "",
            floor: ""
        })
        let {floorId} = useParams()

        const navigate = useNavigate()

        
        const handleChange = (e) => {
            const { name, value } = e.target;
            setPantryForm((prevForm) => ({
            ...prevForm,
            [name]: value,
            floor: floorId
            }));
            console.log(pantryForm)
        };
        
        const addPantryOnFloor =  async (e) =>{
            e.preventDefault()
            try {
            await axios.post(`http://localhost:8000/api/pantries/`, pantryForm)
            // props.fetchPantryByFloor()
            navigate('/dashboard')
            } catch (error) {
            console.error('Error creating pantry:', error);
            }
        }

        
    

  return (
    <div className="home-card">
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

export default CreatePantryForm