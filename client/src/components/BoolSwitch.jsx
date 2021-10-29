import React from 'react';

import { StyledSmallButton, StyledButtonWrapper } from './Styles.jsx';

const BoolSwitch = (props) => {
  return(
    <div>
      <div>
        {/* <StyledButtonWrapper> */}
          <StyledSmallButton isOn={props.isOn === 1} onClick={() => props.onUpdate(1)}></StyledSmallButton>
        {/* </StyledButtonWrapper> */}
        Yes
      </div>
      <div>
        <StyledSmallButton  isOn={props.isOn === 0} onClick={() => props.onUpdate(0)}></StyledSmallButton>
        No
      </div>
    </div>
  )
}

export default BoolSwitch;

