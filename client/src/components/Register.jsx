import React from 'react';
import Party from './Party.jsx';
import CamperInvite from './CamperInvite.jsx';
import CamperSearch from './CamperSearch.jsx';

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
    <div onClick={() => props.OpenCamperSearch()}>find other campers...</div>
    <div onClick={() => props.OpenCamperInvite()}>invite new camper</div>
    <CamperSearch
    openModal={props.openModal}
    CloseCamperSearch={props.CloseCamperSearch}/>
    <CamperInvite
    openModal={props.openModal}
    CloseCamperInvite={props.CloseCamperInvite}/>
  </div>
  )
};

export default Register;