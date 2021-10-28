import React from 'react';

import { StyledSmallButton } from './Styles.jsx';

const BoolSwitch = (props) => {
  return(
    <div>
      <div>
        <StyledSmallButton isOn={props.isOn === 1} onClick={() => props.onUpdate(1)}></StyledSmallButton>
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

