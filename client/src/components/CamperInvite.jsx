import React from 'react';

import { StyledModal, Overlay } from './Styles.jsx';

const CamperInvite = (props) => {
  if (props.modalState !== 'camperInvite') {
    return null;
  }

  return (
    <div>
      <Overlay onClick={() => props.closeModal()}></Overlay>
      <StyledModal>
        <button
          onClick={() => props.closeModal()}
        >X</button>
        <div>Talk to Josh</div>
        <div>Instruction on how to contact Josh</div>
      </StyledModal>
    </div>
  )
}

export default CamperInvite;