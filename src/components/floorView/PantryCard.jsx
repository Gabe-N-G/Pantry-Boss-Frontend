import React from 'react'

// TODO: Destructure props
function PantryCard(props) {
  console.log(props.pantrys)

  return (
    <div className='twin-card'>PantryCard
      {props.pantrys ? (
        props.pantrys.map((pant)=>(
          <div id={pant.id}>
            <p>{pant.name}</p>
          </div>
        ))
      ) : (
        <p>Now loading</p>
      )}
    </div>
  )
}

export default PantryCard