import React, { useState} from "react";

import Party from './Party.jsx';
import CamperInvite from './CamperInvite.jsx';
import CamperSearch from './CamperSearch.jsx';
import Stripe from './Stripe.jsx';
import { BodyWrapper, StyledButton, StyledClickableDiv } from './Styles.jsx';
import Overlay from './Overlay.jsx';
import api from "../api/api";

const Register = (props) => {
  let [modal, setModal] = useState('');
  const openModal = (name) => setModal(name);
  const closeModal = () => setModal('');

  const addToParty = camper => {
    /*
     if camper can start a party {
        if camper has not started a party {
          camper.startParty()
        }
        camper.party.addCamper()
          if (camper.isInParty()) {
            error: cannot add camper as they are already in Joe's party
          }

      } else {
          tell camper why they can't start party
            e.g.
             you do not have a "full account"
             someone else added you to their own party already (you cannot be in two different parties: theirs and your own)

      }
    */
    api.run('registration/camper/add', {
      partyId: props.partyId,
      camperId: camper.camperId,
      campId: props.event,
      neighborhood: camper.neighborhood
    })
      .then((response) => {
        props.addToParty(props.partyId, camper);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
  <BodyWrapper>
    <div>Party: {props.partyId}</div>
    <div>Camper: {props.camper}</div>
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