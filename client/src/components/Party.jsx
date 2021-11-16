import React from 'react';

import { RowWrapper, StyledEditButton, StyledCheckMark } from './Styles.jsx';
import checkMark from './../assets/checkmark.jpg';

const Party = (props) => {
  const party = props.party;
  const partyList = party.map((partyMember) =>
  // TODO: when we figure out the status for each camper's registeration, then we can conditionally render the checkmark for those that have finished registeration => may add different symbols depending on what their status is
    <RowWrapper key={partyMember.camper.toString()}>
      <StyledCheckMark src={checkMark}/>
      {partyMember.camper}
      <StyledEditButton onClick={() => props.setCurrentCamper(partyMember.camperId)}>Edit</StyledEditButton>
    </RowWrapper>
  );
  return (
  <div>
    {partyList}
  </div>
  )
};

export default Party;