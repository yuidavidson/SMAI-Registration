// TODO: need somewhere to make sure that the partyLeader is already in the party

import React, { useState, useEffect } from "react";

import Party from './Party.jsx';
import CamperInvite from './CamperInvite.jsx';
import CamperSearch from './CamperSearch.jsx';
import Stripe from './Stripe.jsx';
import { BodyWrapper, StyledButton, StyledClickableDiv, ContentWrapper, RowWrapper } from './Styles.jsx';
import Overlay from './Overlay.jsx';
import api from "../api/api";
import CamperModel from "../models/camper";
import RegistrationModel from "../models/registration";
import sampleRegistration from "../models/tests/registration.json.js";

const Register = (props) => {

  let dummyReg = {
    "canRegisterParty": true,
    "isPartyLeader": true,
    "partyReg": {
      "campId": "",
      "partyId": "",
      "camperId":  "",
      "owed": "",
      "paid":  "",
      "customPricesRequests": "",
      "isPaymentPlanRequested":  "",
      "status": "",
      "notes":  ""
    },
    "partyCampers": [
      {
        "partyId":  "",
        "camperId": "",
        "campId":  "",
        "neighborhood": "",
        "camperName": ""
      }
    ],
    "pastPartyCampers": [
      {
        // TODO: not that it matters too much because this should get overwritten in the initial render, but make this empty again later
        "partyId":  "Y717",
        "camperId": 65,
        "campId":  1,
        "neighborhood": "v pz",
        "camperName": "Athena Bucher"
      }
    ],
    "camperReg": {
      "partyId":  "",
      "camperId": "",
      "campId":  "",
      "neighborhood": "",
      "camperName": ""
    }
  };

  let [modal, setModal] = useState('');
  let [isInitialRender, setIsInitialRender] = useState(true);
  let [reg, setReg] = useState(dummyReg);
  let [partyInvite, setPartyInvite] = useState('');
  const openModal = (name) => setModal(name);
  const closeModal = () => setModal('');


  useEffect(() => {
    // Ivan's solution to the dummy data problem
    // setReg(sampleRegistration);
    // api.run('registration/get')
    //   .then((response) => {
    //     const newReg = new RegistrationModel(response.data);
    //     setReg(newReg);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // temp code not calling api, because something is broken on that side!!! currently doesn't work how we want it to => if the isInitialRender is there, if the dummyReg changes, the component won't re-render which is a no-no
    if (isInitialRender) {
      setIsInitialRender(false);
      setReg(dummyReg);
    }

    // if (isInitialRender) {
    //   setIsInitialRender(false);
    //   api.run('registration/get', {campId: 1, camperId: 717})
    //     .then((response) => {
    //       const newReg = new RegistrationModel(response.data);
    //       // Using this to assign a dummy past party member
    //       Object.assign(newReg.model.pastPartyCampers[0], {partyId: 'Y717', camperId: 2008, campId: 1, neighrborhood: ' l u', camperName: 'Opal Leib'})
    //       setReg(newReg);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
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
        // console.log(response);
        // props.addToParty(props.partyId, camper);
      })
      .catch((error) => {
        console.log(error);
      });


    // TODO: need someway of storing the party members permanently
    api.run('camper/get', {id: camper.camperId})
    .then((response => {
      // console.log(response.data);
      const newCamper = new CamperModel(response.data);
      props.addToParty(props.partyId, newCamper);
    }))
    .catch((error) => {
      console.log(error);
    })
  };

  return (
  <BodyWrapper>
    <ContentWrapper>
      <div>Party: {props.partyId}</div>
      <div>Camper: {props.camper}</div>
      { props.party.length ?
      <div>
        <div>Who will you register?</div>
        <div>choose one</div>
        <Party
        party={props.party}
        setCurrentCamper={props.setCurrentCamper}
        isCurrentParty={true}
        />
      </div> : "You currently don't have anyone in your party to register for this event. Please add people from previous events who were in your party from the list below, or contact administration to add other people to your party." }
      {/* The party invite functionallity has been canceled. For now, whenever a party leader wants to add someone new to their party, they must go through administration directly */}
      {/* {partyInvite ?
      <div>
        <div>Party Invitations</div>
        <div>You have been invited to {partyInvite.partyLeader}'s party</div>
        <button>Accept</button>
        <button>Decline</button>
      </div>
      : null} */}

      {/* will have to either change Party component to work properly with this section (so it doesn't have the edit and check mark and add a add button) or create a new component */}
      {reg.pastPartyCampers && reg.pastPartyCampers.length > 0 ?
      <div> Add People From Last Year's Party
      <Party
      party={reg.pastPartyCampers}
      addToParty={addToParty}
      isCurrentParty={false}
      />
      </div> : null
      }
      {/* We end up not needing to add new campers to the party from direction of HR(Josh) so campersearch is removed => we may eventually want to reuse this for administration side */}
      {/* <StyledClickableDiv
        onClick={() => openModal('camperSearch')}
      >find other campers...</StyledClickableDiv> */}
      <StyledClickableDiv
        onClick={() => openModal('camperInvite')}
      >Information on how to invite a new Camper</StyledClickableDiv>

      <Overlay currentId={modal} close={closeModal} myId='camperInvite'>
        <CamperInvite randomStuff="rannddoommm"/>
      </Overlay>
      {/* <Overlay currentId={modal} close={closeModal} myId='camperSearch'>
        <CamperSearch onSelected={addToParty}/>
      </Overlay> */}
      <RowWrapper>
        <StyledButton onClick={() => props.switchStep('stripe')}>Review and Pay</StyledButton>
      </RowWrapper>
    </ContentWrapper>
  </BodyWrapper>
  )
};

export default Register;