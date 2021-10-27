import React from 'react';

import { StyledModal, Overlay } from './Styles.jsx';

const CamperSearch = (props) => {
  if (props.modalState !== 'camperSearch') {
    return null;
  }

  return (
    <div>
      <Overlay onClick={() => props.closeModal()}></Overlay>
      <StyledModal>
        <button
          onClick={() => props.closeModal()}
        >X</button>
        <div>Find Campers...</div>
        <div>Type in Name</div>
        <input/>
      </StyledModal>
    </div>
  )
}

export default CamperSearch;