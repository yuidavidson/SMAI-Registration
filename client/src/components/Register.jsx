import React, { useState, useEffect } from "react";

import Party from './Party.jsx';
import CamperInvite from './CamperInvite.jsx';
import CamperSearch from './CamperSearch.jsx';
import Stripe from './Stripe.jsx';
import { BodyWrapper, StyledButton, StyledClickableDiv } from './Styles.jsx';
import Overlay from './Overlay.jsx';
import api from "../api/api";
import CamperModel from "../models/camper";
import RegistrationModel from "../models/registration";
import sampleRegistration from "../models/tests/registration.json.js";

const Register = (props) => {
  let [modal, setModal] = useState('');
  const openModal = (name) => setModal(name);
  const closeModal = () => setModal('');

  let [reg, setReg] = useState(null);
  useEffect(() => {
    setReg(sampleRegistration);
    // api.run('registration/get')
    //   .then((response) => {
    //     const newReg = new RegistrationModel(response.data);
    //     setReg(newReg);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  });

  const addToParty = camper => {
    /*
    PARTY INVITES
    party-invite/get
    partyInvitation= null | [ { campId, camperId, camperName, camperEmail, partyRegId } ]

    <list>

    API: party-invite/accept (camperId, partyRegId) || party-invite/decline (camperId, partyRegId)


    FULL CAMPER: canRegisterParty=true
    1. I am have not started a party reg
       AND no one else has me in their party reg
       partyReg=null
       party=[ ]
       camperReg=null

    2. I have been added to someone's party reg
       isPartyLeader=false
       partyReg={partyId: <not mine>}
       party=[ { }, { } ]
       camperReg={ }

    3. I have started my party reg:
       isPartyLeader=true
       partyReg={partyId: <MINE>}
       party=[ { }, { } ]
       camperReg={ }

    NEWBIE CAMPER: canRegisterParty=false
    1. No one has me in their party reg

    2. I have been added to someone's party reg

    */
    api.run('registration/camper/add', {
      partyId: props.partyId,
      camperId: camper.id,
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