import React from 'react';

const Party = (props) => {
  const party = props.party;
  const partyList = party.map((partyMember) =>
    <div key={partyMember.toString()}>
      <button onClick={() => props.SetCurrentCamper(partyMember)}>x</button>
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