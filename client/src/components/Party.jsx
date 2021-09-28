import React from 'react';

const Party = (props) => {
  const party = props.party;
  const partyList = party.map((partyMember) =>
    <li key={partyMember.toString()}>{partyMember}</li>
  );
  return (
  <div>{partyList}</div>
  )
};

export default Party;