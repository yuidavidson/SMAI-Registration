import React from 'react';

const Party = (props) => {
  const party = props.party;
  const partyList = party.map((partyMember) =>
    <div key={partyMember.camper.toString()}>
      <button onClick={() => props.setCurrentCamper(partyMember)}>x</button>
      {partyMember.camper}
      </div>
  );
  return (
  <div>
    {partyList}
  </div>
  )
};

export default Party;