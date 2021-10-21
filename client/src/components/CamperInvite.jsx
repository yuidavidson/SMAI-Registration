import React from 'react';

const CamperInvite = (props) => {
  if (props.openModal !== 'camperInvite') {
    return null;
  }

  return (
    <div>
      <button onClick={() => props.CloseCamperInvite()}>X</button>
      <div>Talk to Josh</div>
      <div>Instruction on how to contact Josh</div>
    </div>
  )
}

export default CamperInvite;