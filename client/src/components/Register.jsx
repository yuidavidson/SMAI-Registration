import React, { useState} from "react";

import Party from './Party.jsx';
import CamperInvite from './CamperInvite.jsx';
import CamperSearch from './CamperSearch.jsx';
import Stripe from './Stripe.jsx';
import { BodyWrapper, StyledButton, StyledClickableDiv } from './Styles.jsx';
import Overlay from './Overlay.jsx';

const Register = (props) => {
  let [modal, setModal] = useState('');
  const openModal = (name) => setModal(name);
  const closeModal = () => setModal('');

  const addToParty = camper => props.addToParty(props.partyId, camper);

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
    <StyledClickableDiv
      onClick={() => openModal('camperSearch')}
    >find other campers...</StyledClickableDiv>
    <StyledClickableDiv
      onClick={() => openModal('camperInvite')}
    >invite new camper</StyledClickableDiv>

    <Overlay currentId={modal} close={closeModal} myId='camperInvite'>
      <CamperInvite randomStuff="rannddoommm"/>
    </Overlay>
    <Overlay currentId={modal} close={closeModal} myId='camperSearch'>
      <CamperSearch onSelected={addToParty}/>
    </Overlay>
    <StyledButton onClick={() => props.switchStep('stripe')}>Review and Pay</StyledButton>
  </BodyWrapper>
  )
};

export default Register;