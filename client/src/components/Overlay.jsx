import React from 'react';

import {StyledModal, OverlayBackground} from './Styles.jsx';

const Overlay = ({children, close, currentId, myId}) => {
  if (currentId !== myId) {
    return null;
  }

  return (
    <div>
      <OverlayBackground onClick={() => close()}></OverlayBackground>
      <StyledModal>
        <button
          onClick={() => close()}
        >X</button>
          {children}
      </StyledModal>
    </div>
  )
};

export default Overlay;