import React from 'react';

const CamperSearch = (props) => {
  if (props.modalState !== 'camperSearch') {
    return null;
  }

  return (
    <div>
      <button onClick={() => props.closeModal()}>X</button>
      <div>Find Campers...</div>
      <div>Type in Name</div>
      <input></input>
    </div>
  )
}

export default CamperSearch;