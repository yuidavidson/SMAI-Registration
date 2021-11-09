import React from 'react';

import Party from './Party.jsx';
import CamperInvite from './CamperInvite.jsx';
import CamperSearch from './CamperSearch.jsx';
import Stripe from './Stripe.jsx';
import { BodyWrapper, StyledButton } from './Styles.jsx';
import Overlay from './Overlay.jsx';

const Register = (props) => {
  return (
  <BodyWrapper>
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

    <Overlay currentId={props.modalState} close={props.closeModal} myId='camperInvite'>
      <CamperInvite randomStuff="rannddoommm"/>
    </Overlay>
    <Overlay currentId={props.modalState} close={props.closeModal} myId='camperSearch'>
      <CamperSearch />
    </Overlay>
    <StyledButton onClick={() => props.switchStep('stripe')}>Review and Pay</StyledButton>
  </BodyWrapper>
  )
};

export default Register;