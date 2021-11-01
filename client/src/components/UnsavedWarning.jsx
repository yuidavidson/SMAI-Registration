/*
  EDIT: one major problem with returning to toc without saving at the moment is that any changes made to the state will persist regardless of not saving it. This can be fixed in two ways, either change the state of said component (ex. personal, contact) when unMounting, or to update the entire state information for App component on unmount and/or mounting of component. Currently hard to test without the backend working
*/

import React from 'react';

import { StyledModal, StyledButton, ButtonWrapper} from './Styles.jsx';

const UnsavedWarning = (props) => {
  if(props.modalState !== 'unsavedWarning') {
    return null;
  }

  return(
    <StyledModal>
      <button onClick={props.closeModal}>X</button>
      <div>You have unsaved changes. Are you certain you want to continue?</div>
      <ButtonWrapper>
        <StyledButton onClick={() => props.switchAndClose('toc')}>Yes</StyledButton>
        <StyledButton onClick={props.closeModal}>No</StyledButton>
      </ButtonWrapper>
    </StyledModal>
  )
}

export default UnsavedWarning;