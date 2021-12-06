import React from 'react';

import { RowWrapper, StyledEditButton, StyledCheckMark } from './Styles.jsx';
import checkMark from './../assets/checkmark.jpg';

const Party = (props) => {
  const party = props.party;
  const partyList = party.map((camper) =>
  // TODO: when we figure out the status for each camper's registeration, then we can conditionally render the checkmark for those that have finished registeration => may add different symbols depending on what their status is
    <RowWrapper key={camper.camperId}>
      {props.isCurrentParty ? <StyledCheckMark src={checkMark}/> : null}
      {props.isCurrentParty ? <div>{camper.firstName} {camper.lastName}</div> : <div>{camper.camperName}</div>}
      {props.isCurrentParty ? <StyledEditButton onClick={() => props.setCurrentCamper(camper)}>Edit</StyledEditButton> : null}
      {!props.isCurrentParty ? <button onClick={() => props.addToParty(camper)}>Add</button> : null}
    </RowWrapper>
  );
  return (
  <div>
    {partyList}
  </div>
  )
};

export default Party;