/*
  Components still needed:
  Payment
    Custom Pricing - amount and reason
*/

import React from 'react';
import axios from 'axios';

import TableOfContents from './TableOfContents.jsx';
import Register from './Register.jsx';
import PersonalInfo from './PersonalInfo.jsx';
import ContactInfo from './ContactInfo.jsx';
import Vehicle from './Vehicle.jsx';
import EmergencyContact from './EmergencyContact.jsx';
import MedicalInfo from './MedicalInfo.jsx';
import Neighborhood from './Neighborhood.jsx';
import Sessions from './Sessions.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    // dummy data for testing included
    this.state = {
      allSteps: {
        toc: 'toc',
        register: 'register',
        sessions: 'sessions',
        personal: 'personal',
        contact: 'contact',
        vehicle: 'vehicle',
        emergency: 'emergency',
        medical: 'medical',
        neighborhood: 'neighborhood',
      },
      step: 'register',
      readyForNextStep: false,
      modalState: '',
      account: 'SMF034',
      camper: 'Joshua Freeman',
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
        },
        {
          camper: 'Karen Freeman',
        },
        {
          camper: 'David Konno',
        },
        {
          camper: 'Shelli Smart',
        },
        {
          camper: 'Cedar Dobson',
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
      // Assumed that the title of each session and it's date will eventually be separate -> probably have to change to an object then
      sessions: [
        'Pre-pre camp - July 5',
        'Set Up - July 8',
        'Session 1 - July 12',
        'Session 2 - July 15',
        'Session 3 - July 18',
        'Tear Down - July 21',
      ],
      sessionsWithMeals: [
        'Session 1',
        'Session 2',
        'Session 3',
      ],
      mealOptions: [
        'Dinner & Breakfast',
        'Dinner Only',
      ],
      foodPreferences: [
        'Meat',
        'Vegetarian',
        'Vegan',
      ]
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.switchStep = this.switchStep.bind(this);

    this.SetCurrentCamper = this.SetCurrentCamper.bind(this);
  };

  // these functions are for opening and closing modals

  openModal(modalType) {
    this.setState({modalState: modalType})
  }

  closeModal() {
    this.setState({ modalState: ''});
  }

  // EDIT: create CloseModal to be used for both modals

  // function for switching components

  switchStep(step) {
    this.setState({step: step});
  }

  SetCurrentCamper(partyMember) {
    let newData = this.state.currentCamper;
    newData.camper = partyMember.camper;
    this.setState({currentCamper: newData});
    // this.setState({readyForNextStep: true});
    this.setState({step: 'toc'});
  }

  render() {
    if (this.state.step === 'register') {
      return (
        <div>
          <Register
            account={this.state.account}
            camper={this.state.camper}
            party={this.state.party}
            modalState={this.state.modalState}
            SetCurrentCamper={this.SetCurrentCamper}
            openModal={this.openModal}
            closeModal={this.closeModal}
          />
        </div>
      )
    } else if (this.state.step === 'toc') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <TableOfContents
            switchStep={this.switchStep}
        />
          <button onClick={() => this.switchStep('register')}>Back to All</button>
        </div>
      )
    } else if (this.state.step === 'personal') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <PersonalInfo personal={this.state.currentCamper.personal} switchStep={this.switchStep}/>
        </div>
      )
    } else if (this.state.step === 'contact') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <ContactInfo contact={this.state.currentCamper.contact} switchStep={this.switchStep}/>
        </div>
      )
    } else if (this.state.step === 'vehicle') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <Vehicle vehicle={this.state.currentCamper.vehicle} switchStep={this.switchStep}/>
        </div>
      )
    }
    else if (this.state.step === 'emergency') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <EmergencyContact emergencyContact={this.state.currentCamper.emergencyContact} switchStep={this.switchStep}/>
        </div>
      )
    } else if (this.state.step === 'medical') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <MedicalInfo medicalInformation={this.state.currentCamper.medicalInformation} switchStep={this.switchStep}/>
        </div>
      )
    } else if (this.state.step === 'neighborhood') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <Neighborhood neighborhood={this.state.currentCamper.neighborhood} switchStep={this.switchStep}/>
        </div>
      )
    } else if (this.state.step === 'sessions') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <Sessions sessions={this.state.currentCamper.sessions} switchStep={this.switchStep}></Sessions>
        </div>
      )
    }
  }
};

export default App;