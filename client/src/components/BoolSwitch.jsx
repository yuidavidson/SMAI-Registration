import React from 'react';

import { StyledSmallButton, SmallButtonWrapper, ButtonWrapper } from './Styles.jsx';

const BoolSwitch = (props) => {
  return(
    <ButtonWrapper>
      <SmallButtonWrapper>
          <StyledSmallButton isOn={props.isOn === 1} onClick={() => props.onUpdate(1)}></StyledSmallButton>
        Yes
      </SmallButtonWrapper>
      <SmallButtonWrapper>
        <StyledSmallButton  isOn={props.isOn === 0} onClick={() => props.onUpdate(0)}></StyledSmallButton>
        No
      </SmallButtonWrapper>
    </ButtonWrapper>
  )
}

export default BoolSwitch;

