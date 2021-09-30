import React from 'react';
import Party from './Party.jsx';

// don't like the name of this component -> discuss what to re-name it
const Register = (props) => {
  return (
  <div>
    <div>Account {props.account}</div>
    <div>{props.camper}</div>
    <div>Who will you register?</div>
    <div>choose one</div>
    {/* add edit button for each camper and also a marker to show it was finished */}
    <Party
    party={props.party}
    SetCurrentCamper={props.SetCurrentCamper}
    />
  </div>
  )
};

export default Register;