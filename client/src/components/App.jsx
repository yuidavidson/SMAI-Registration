/*
  Components still needed:
  Payment
    Custom Pricing - amount and reason

  EDIT: make it so that when you move back t o register, currentCamper is reset
*/

import React from 'react';
import axios from 'axios';

import Navigation from './Navigation.jsx';
import Register from './Register.jsx';
import TableOfContents from './TableOfContents.jsx';
import PersonalInfo from './PersonalInfo.jsx';
import ContactInfo from './ContactInfo.jsx';
import Vehicle from './Vehicle.jsx';
import EmergencyContact from './EmergencyContact.jsx';
import MedicalInfo from './MedicalInfo.jsx';
import Neighborhood from './Neighborhood.jsx';
import Sessions from './Sessions.jsx';
import { BodyWrapper, StyledButton } from './Styles.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    // dummy data for testing included
    this.state = {
      step: 'register',
      stepKey: {
        register: 'Camper Selection',
        toc: 'Table of Contents',
        personal: 'Personal Information',
        contact: 'Contact Information',
        vehicle: 'Vehicle Information',
        emergency: 'Emergency Contact',
        medical: 'Medical Information',
        neighborhood: 'Neighborhood',
        sessions: 'Sessions',
      },
      readyForNextStep: false,
      modalState: '',
      account: 'SMF034',
      camper: 'Joshua Freeman',
      event: 'Mill 2022',
      neighborhoodkey: {
        1: 'American Hill',
        2: 'Balkan Camp',
        3: 'Car Camp',
        4: 'Coffee House',
        5: 'Cowboy Camp',
        6: 'Flamenco Camp',
        7: 'The Heights',
        8: 'Kitchen',
        9: 'Lakeshore',
        10: 'Meditation Meadow',
        11: 'Rec Row',
        12: 'South Pole',
        13: 'Upper Touistan',
        14: 'Other',
        15: 'Don\'t know yet',
      },
      // The party structure might have to be changed depending on what the data coming in looks like

      // party : [
      //   'Joshua Freeman',
      //   'Karen Freeman',
      //   'David Konno',
      //   'Shelli Smart',
      //   'Cedar Dobson',
      // ],
      party: [
        {
          camper: 'Joshua Freeman',
          camperId: 1,
        },
        {
          camper: 'Karen Freeman',
          camperId: 2,
        },
        {
          camper: 'David Konno',
          camperId: 3,
        },
        {
          camper: 'Shelli Smart',
          camperId: 4,
        },
        {
          camper: 'Cedar Dobson',
          camperId: 5,
        },
      ],
      currentCamper: {
        camper: '',
        personal: {
          firstName: 'Joshua',
          lastName: 'Freeman',
          bday: 'April 1st',
          foodPreference: 'Oxygen',
          neighborhood: 'I honestly still don\'t know the neighborhoods',
        },
        contact: {
          address: 'tired of making things up',
          city: 'somewhere',
          region: 'CA',
          zip: '76849',
          country: 'united states of shitty people',
          phone1: '7849873',
          phone2: '9732746',
          email1: 'who@yahoo.com',
          email2: 'me@hotmail.com',
        },
        vehicle: {
          vehicle1Model: 'Tundra',
          vehicle1Plate: '83K8Z3J',
          vehicle1State: 'CA',
          vehicle2Model: 'Trail Blazer',
          vehicle2Plate: '6E9K2JH3',
          vehicle2State: 'WA',
        },
        emergencyContact: {
          contact1FirstName: 'Dad',
          contact1LastName: 'Dadson',
          contact1Relationship: 'Dad',
          contact1Phone: '8475927',
          contact1Location: 'Home',
          contact2FirstName: 'Bro',
          contact2LastName: 'Dadson',
          contact2Relationship: 'Bro',
          contact2Phone: '8469932',
          contact2Location: 'Haven',
          lastUpdated: null,
        },
        medicalInformation: {
          medicalCondition: 'Always mad',
          allergy: 'nuts',
          asthma: false,
          plan: 'I\'m planing',
          doctor: 'DR. Fwoop',
          hospital: 'somewhere',
          specialNeeds: 'cuddles',
          lastUpdated: 'I can\'t remember',
        },
        neighborhood: 'Balkan Camp',
        sessions: [
          {
            id: null,
            sessionId: null,
            mealId: null,
            foodPreference: null,
            crewId: null,
          }
        ],
      },
      // Assumed that the title of each session and it's date will eventually be separate -> probably have to change to an object. Currently not in use
      // sessions: [
      //   'Pre-pre camp - July 5',
      //   'Set Up - July 8',
      //   'Session 1 - July 12',
      //   'Session 2 - July 15',
      //   'Session 3 - July 18',
      //   'Tear Down - July 21',
      // ],
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.switchStep = this.switchStep.bind(this);
    this.switchAndClose = this.switchAndClose.bind(this);

    this.setCurrentCamper = this.setCurrentCamper.bind(this);
  }

  // EDIT: when back-end is ready, should call for the party members of the user
  // componentDidMount() {
  //   axios.get('https://smai.us/api/camper/get?id=2')
  //   .then((response) => {
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // }

  openModal(modalType) {
    this.setState({modalState: modalType})
  }

  closeModal() {
    this.setState({ modalState: ''});
  }

  // function for switching components
  switchStep(step) {
    this.setState({step: step});
  }

  switchAndClose(step) {
    this.setState({modalState: '', step: step});
  }

  //  old setCurrentCamper
  // setCurrentCamper(partyMember) {
  //   let newData = this.state.currentCamper;
  //   newData.camper = partyMember.camper;
  //   this.setState({currentCamper: newData});
  //   this.setState({step: 'toc'});
  // }

  setCurrentCamper(partyMemberId) {
    axios.get(`https://smai.us/api/camper/get?id=${partyMemberId}`)
    .then((response) => {
      let data = response.data.data.values;
      let newData = {
        camper: data.firstName + ' ' + data.lastName,
        personal: {
          firstName: data.firstName,
          lastName: data.lastName,
          bday: data.birthyear,
          foodPreference: data.foodPreference,
          neighborhood: data.neighborhood,
        },
        contact: {
          address: data.address,
          city: data.city,
          region: data.region,
          zip: data.postalCode,
          country: data.country,
          phone1: data.phone1,
          phone2: data.phone2,
          email1: data.email,
          email2: '',
        },
        vehicle: {
          vehicle1Model: data.vehicle1Model,
          vehicle1Plate: data.vehicle1Plate,
          vehicle1State: data.vehicle1State,
          vehicle2Model: data.vehicle2Model,
          vehicle2Plate: data.vehicle2Plate,
          vehicle2State: data.vehicle2State,
        },
        emergencyContact: {
          contact1FirstName: data.emergency1FirstName,
          contact1LastName: data.emergency1LastName,
          contact1Relationship: data.emergency1Relationship,
          contact1Phone: data.emergency1Phone,
          contact1Location: data.emergency1Location,
          contact2FirstName: data.emergency2FirstName,
          contact2LastName: data.emergency2LastName,
          contact2Relationship: data.emergency2Relationship,
          contact2Phone: data.emergency2Phone,
          contact2Location: data.emergency2Location,
          lastUpdated: data.emergencyLastUpdated,
        },
        medicalInformation: {
          medicalCondition: data.medicalCondition,
          allergy: data.medicalHasAllergy,
          asthma: data.medicalHasAsthma,
          plan: data.medicalPlan,
          doctor: data.medicalDoctor,
          hospital: data.medicalHospital,
          specialNeeds: data.medicalSpecialNeeds,
          lastUpdated: data.medicalLastUpdated,
        },
        neighborhood: data.neighborhood,
        sessions: [
          {
            id: null,
            sessionId: null,
            mealId: null,
            foodPreference: null,
            crewId: null,
          }
        ],
      }
      this.setState({currentCamper: newData, step: 'toc'});
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    if (this.state.step === 'register') {
      return (
        <div>
          <Navigation
            camper={this.state.camper}
            event={this.state.event}
            currentCamper={this.state.currentCamper.camper}
            step={this.state.step}
            stepKey={this.state.stepKey}
          ></Navigation>
          <Register
            account={this.state.account}
            camper={this.state.camper}
            party={this.state.party}
            modalState={this.state.modalState}
            setCurrentCamper={this.setCurrentCamper}
            openModal={this.openModal}
            closeModal={this.closeModal}
          />
        </div>
      )
    } else if (this.state.step === 'toc') {
      return (
        <div>
          <Navigation
            camper={this.state.camper}
            event={this.state.event}
            currentCamper={this.state.currentCamper.camper}
            step={this.state.step}
            switchStep={this.switchStep}
            stepKey={this.state.stepKey}
          ></Navigation>
          <div>Registering {this.state.currentCamper.camper}</div>
          <TableOfContents
            switchStep={this.switchStep}
          />
          {/* <StyledButton
            onClick={() => this.switchStep('register')}>Back to All</StyledButton> */}
        </div>
      )
    } else if (this.state.step === 'personal') {
      return (
        <div>
          <Navigation
            camper={this.state.camper}
            event={this.state.event}
            currentCamper={this.state.currentCamper.camper}
            step={this.state.step}
            switchStep={this.switchStep}
            stepKey={this.state.stepKey}
          ></Navigation>
          <div>Registering
            {this.state.currentCamper.camper}
          </div>
          <PersonalInfo
            personal={this.state.currentCamper.personal}
            switchStep={this.switchStep}
            modalState={this.state.modalState}
            switchAndClose={this.switchAndClose}
            openModal={this.openModal}
            closeModal={this.closeModal}
          />
        </div>
      )
    } else if (this.state.step === 'contact') {
      return (
        <div>
          <Navigation
            camper={this.state.camper}
            event={this.state.event}
            currentCamper={this.state.currentCamper.camper}
            step={this.state.step}
            switchStep={this.switchStep}
            stepKey={this.state.stepKey}
          ></Navigation>
          <div>Registering {this.state.currentCamper.camper}</div>
          <ContactInfo
            contact={this.state.currentCamper.contact}
            switchStep={this.switchStep}
          />
        </div>
      )
    } else if (this.state.step === 'vehicle') {
      return (
        <div>
          <Navigation
            camper={this.state.camper}
            event={this.state.event}
            currentCamper={this.state.currentCamper.camper}
            step={this.state.step}
            switchStep={this.switchStep}
            stepKey={this.state.stepKey}
          ></Navigation>
          <div>Registering {this.state.currentCamper.camper}</div>
          <Vehicle
            vehicle={this.state.currentCamper.vehicle}
            switchStep={this.switchStep}
          />
        </div>
      )
    }
    else if (this.state.step === 'emergency') {
      return (
        <div>
          <Navigation
            camper={this.state.camper}
            event={this.state.event}
            currentCamper={this.state.currentCamper.camper}
            step={this.state.step}
            switchStep={this.switchStep}
            stepKey={this.state.stepKey}
          ></Navigation>
          <div>Registering {this.state.currentCamper.camper}</div>
          <EmergencyContact
            emergencyContact={this.state.currentCamper.emergencyContact}
            switchStep={this.switchStep}
          />
        </div>
      )
    } else if (this.state.step === 'medical') {
      return (
        <div>
          <Navigation
            camper={this.state.camper}
            event={this.state.event}
            currentCamper={this.state.currentCamper.camper}
            step={this.state.step}
            switchStep={this.switchStep}
            stepKey={this.state.stepKey}
          ></Navigation>
          <div>Registering {this.state.currentCamper.camper}</div>
          <MedicalInfo
            medicalInformation={this.state.currentCamper.medicalInformation}
            switchStep={this.switchStep}
          />
        </div>
      )
    } else if (this.state.step === 'neighborhood') {
      return (
        <div>
          <Navigation
            camper={this.state.camper}
            event={this.state.event}
            currentCamper={this.state.currentCamper.camper}
            step={this.state.step}
            switchStep={this.switchStep}
            stepKey={this.state.stepKey}
          ></Navigation>
          <div>Registering {this.state.currentCamper.camper}</div>
          <Neighborhood
            neighborhood={this.state.currentCamper.neighborhood}
            switchStep={this.switchStep}
          />
        </div>
      )
    } else if (this.state.step === 'sessions') {
      return (
        <div>
          <Navigation
            camper={this.state.camper}
            event={this.state.event}
            currentCamper={this.state.currentCamper.camper}
            step={this.state.step}
            switchStep={this.switchStep}
            stepKey={this.state.stepKey}
          ></Navigation>
          <div>Registering {this.state.currentCamper.camper}</div>
          <Sessions
            sessions={this.state.currentCamper.sessions}
            switchStep={this.switchStep}
          />
        </div>
      )
    }
  }
};

export default App;