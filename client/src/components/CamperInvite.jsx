import React from 'react';

const CamperInvite = (props) => {
  if (props.modalState !== 'camperInvite') {
    return null;
  }

  return (
    <div>
      <button onClick={() => props.closeModal()}>X</button>
      <div>Talk to Josh</div>
      <div>Instruction on how to contact Josh</div>
    </div>
  )
}

export default CamperInvite;