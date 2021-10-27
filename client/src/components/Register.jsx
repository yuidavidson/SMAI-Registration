import React from 'react';

import Party from './Party.jsx';
import CamperInvite from './CamperInvite.jsx';
import CamperSearch from './CamperSearch.jsx';

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
    setCurrentCamper={props.setCurrentCamper}
    />
    <div
      onClick={() => props.openModal('camperSearch')}
    >find other campers...</div>
    <div
      onClick={() => props.openModal('camperInvite')}
    >invite new camper</div>
    <CamperSearch
      modalState={props.modalState}
      closeModal={props.closeModal}
    />
    <CamperInvite
      modalState={props.modalState}
      closeModal={props.closeModal}
    />
  </div>
  )
};

export default Register;