import React from 'react'

// TODO: Destructure props
function PantryCard(props) {
  console.log(props.pantrys)




  return (
    <div className='twin-card'>PantryCard
      {props.pantrys ? (
        props.pantrys.map((pant)=>(
            <button key={pant.id} id={pant.id} onClick={props.selectPantry}>{pant.name}</button>
        ))
      ) : (
        <p>Now loading</p>
      )}
    </div>
  )
}

export default PantryCard