import React from 'react';

import {StyledModal, OverlayBackground, StyledXButton} from './Styles.jsx';

const Overlay = ({children, close, currentId, myId}) => {
  if (currentId !== myId) {
    return null;
  }

  return (
    <div>
      <OverlayBackground onClick={() => close()}></OverlayBackground>
      <StyledModal>
        <StyledXButton
          onClick={() => close()}
        >x</StyledXButton>
          {children}
      </StyledModal>
    </div>
  )
};

export default Overlay;