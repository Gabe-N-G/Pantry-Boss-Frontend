import React from 'react'
import DispenserCard from './DispenserCard'
import PantryCard from './PantryCard'
import './FloorView.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


function FloorView() {
  const token = localStorage.getItem('token');
  let {floorId} = useParams()

  const [floorDetail, setFloorDetail] = useState(null)
  const [pantrys, setPantrys] = useState(null)
  const [pantryId, setPantryId] = useState(null)
  
  // console.log(token)

  //TODO: change this to be in a services file

  const fetchPantryByFloor =  async () =>{
    try {
      const res = await axios.get(`http://localhost:8000/api/pantries/?floor_id=${floorId}`)
      // console.log(res.data)
      setPantrys(res.data)
    } catch (error) {
      console.error('Error fetching pantries:', error);
    }
  }

  useEffect(() => {
    fetchPantryByFloor();
  }, []);

  const selectPantry = (e) => {
    setPantryId(e.target.id)
    console.log(pantryId)
  }
   


  return (
    <>
    <div className='home-card'>
      <h1>Floor {floorId}</h1>
      <div className='twin-display'>
        <PantryCard pantrys={pantrys} selectPantry={selectPantry}/>
        <DispenserCard pantryId={pantryId}/>
      </div>
    </div>  
    </>
  )
}

export default FloorView