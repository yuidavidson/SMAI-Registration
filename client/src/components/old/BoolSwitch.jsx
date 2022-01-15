import React from 'react';

import { StyledSmallButton, SmallButtonWrapper, ButtonWrapper } from './Styles.jsx';

const BoolSwitch = (props) => {
  return(
    <ButtonWrapper>
      <SmallButtonWrapper>
          <StyledSmallButton isOn={props.isOn === 1} onClick={() => props.onUpdate(props.fieldName, 1)}></StyledSmallButton>
        Yes
      </SmallButtonWrapper>
      <SmallButtonWrapper>
        <StyledSmallButton  isOn={props.isOn === 0} onClick={() => props.onUpdate(props.fieldName, 0)}></StyledSmallButton>
        No
      </SmallButtonWrapper>
    </ButtonWrapper>
  )
}

export default BoolSwitch;

