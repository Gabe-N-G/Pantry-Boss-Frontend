import React from 'react'

// TODO: Destructure props
function PantryCard(props) {
  console.log(props.pantrys)

const selectPantry = (e) => {
  console.log(e.target.id)
}


  return (
    <div className='twin-card'>PantryCard
      {props.pantrys ? (
        props.pantrys.map((pant)=>(
            <button id={pant.id} onClick={selectPantry}>{pant.name}</button>
        ))
      ) : (
        <p>Now loading</p>
      )}
    </div>
  )
}

export default PantryCard