import React from 'react';

import { StyledSmallButton, SmallButtonWrapper, ButtonWrapper } from './Styles.jsx';

const BoolSwitch = (props) => {
  return(
    <ButtonWrapper>
      <SmallButtonWrapper>
          <StyledSmallButton isOn={props.isOn === 1} onClick={props.onEdit}></StyledSmallButton>
        Yes
      </SmallButtonWrapper>
      <SmallButtonWrapper>
        <StyledSmallButton  isOn={props.isOn === 0} onClick={props.onEdit}></StyledSmallButton>
        No
      </SmallButtonWrapper>
    </ButtonWrapper>
  )
}

export default BoolSwitch;

