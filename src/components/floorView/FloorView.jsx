import React from 'react'
import DispenserCard from './DispenserCard'
import PantryCard from './PantryCard'
import './FloorView.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


function FloorView() {
  const [floorDetail, setFloorDetail] = useState(null)
  
  let {floorId} = useParams()
  console.log(floorId)

  return (
    <>
    <div className='home-card'>
      <h1>Floor {floorId}</h1>
      <div className='twin-display'>
        <PantryCard floorId={floorId}/>
        <DispenserCard/>
      </div>
    </div>  
    </>
  )
}

export default FloorView