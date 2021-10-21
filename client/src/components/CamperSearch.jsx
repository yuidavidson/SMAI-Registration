import React from 'react';

const CamperSearch = (props) => {
  if (props.openModal !== 'camperSearch') {
    return null;
  }

  return (
    <div>
      <button onClick={() => props.CloseCamperSearch()}>X</button>
      <div>Find Campers...</div>
      <div>Type in Name</div>
      <input></input>
    </div>
  )
}

export default CamperSearch;