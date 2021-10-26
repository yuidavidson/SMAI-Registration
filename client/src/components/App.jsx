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
import Crew from './Crew.jsx';
import Meal from './Meal.jsx';
import MealChoice from './MealChoice.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    // dummy data for testing included
    this.state = {
      step: 'Register',
      readyForNextStep: false,
      openModal: '',
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

    this.OpenCamperInvite = this.OpenCamperInvite.bind(this);
    this.CloseCamperInvite = this. CloseCamperInvite.bind(this);
    this.OpenCamperSearch = this.OpenCamperSearch.bind(this);
    this.CloseCamperSearch = this.CloseCamperSearch.bind(this);

    this.SwitchToTOC = this.SwitchToTOC.bind(this);
    this.SwitchToRegister = this.SwitchToRegister.bind(this);
    this.SwitchToSessions = this.SwitchToSessions.bind(this);
    this.SwitchToMeal = this.SwitchToMeal.bind(this);
    this.SwitchToPersonalInfo = this.SwitchToPersonalInfo.bind(this);
    this.SwitchToContactInfo = this.SwitchToContactInfo.bind(this);
    this.SwitchToVehicle = this.SwitchToVehicle.bind(this);
    this.SwitchToEmergencyContacts = this.SwitchToEmergencyContacts.bind(this);
    this.SwitchToMedicalInfo = this.SwitchToMedicalInfo.bind(this);
    this.SwitchToNeighborhood = this.SwitchToNeighborhood.bind(this);
    this.SwitchToCrew = this.SwitchToCrew.bind(this);

    this.SetCurrentCamper = this.SetCurrentCamper.bind(this);
    this.SelectSessions = this.SelectSessions.bind(this);
    this.SelectMeal = this.SelectMeal.bind(this);
  };

  // these functions are for opening and closing modals

  OpenCamperInvite() {
    this.setState({openModal: 'camperInvite'})
  }

  CloseCamperInvite() {
    this.setState({openModal: ''})
  }

  OpenCamperSearch() {
    this.setState({openModal: 'camperSearch'})
  }

  CloseCamperSearch() {
    this.setState({openModal: ''})
  }

  // EDIT: create CloseModal to be used for both modals

  // Return from current component (ex. Personal Information) back to the table of contents

  // Edit: create a function that can be used for all the switch components functions
  SwitchToTOC() {
    // EDIT: add a warning if data was not saved
    this.setState({step: 'TableOfContents'});
  }

  // Return from TOC to camper selection
  SwitchToRegister() {
    this.setState({step: 'Register'});
  }

  // Switches to Selected sections depending on TOC clicks

  SwitchToSessions() {
    this.setState({step: 'Sessions'});
  }

  SwitchToMeal() {
    this.setState({step: 'Meal'})
  }

  SwitchToPersonalInfo() {
    this.setState({step: 'PersonalInfo'});
  }

  SwitchToContactInfo() {
    this.setState({step: 'ContactInfo'});
  }

  SwitchToVehicle() {
    this.setState({step: 'Vehicle'});
  }

  SwitchToEmergencyContacts() {
    this.setState({step: 'EmergencyContact'});
  }

  SwitchToMedicalInfo() {
    this.setState({step: 'MedicalInfo'});
  }

  SwitchToNeighborhood() {
    this.setState({step: 'Neighborhood'});
  }

  SwitchToCrew() {
    this.setState({step: 'Crew'});
  }

  SetCurrentCamper(partyMember) {
    let newData = this.state.currentCamper;
    newData.camper = partyMember.camper;
    this.setState({currentCamper: newData});
    // this.setState({readyForNextStep: true});
    this.setState({step: 'TableOfContents'});
  }

  // Allow session selections
  // EDIT: keep in mind that the session name and start dates might change to be separate feilds -> also keep in mind if order of sessions matters, and deal with the same seesion being clicked twice
  SelectSessions(session) {
    let newData = this.state.currentCamper;
    newData.sessions.push(session);
    this.setState({currentCamper: newData});
  }

  SelectMeal(bool) {
    let newData = this.state.currentCamper;
    newData.meal = bool;
    this.setState({currentCamper: newData});
  }

  render() {
    if (this.state.step === 'Register') {
      return (
        <div>
          <Register
            account={this.state.account}
            camper={this.state.camper}
            party={this.state.party}
            openModal={this.state.openModal}
            SetCurrentCamper={this.SetCurrentCamper}
            OpenCamperInvite={this.OpenCamperInvite}
            CloseCamperInvite={this.CloseCamperInvite}
            OpenCamperSearch={this.OpenCamperSearch}
            CloseCamperSearch={this.CloseCamperSearch}
          />
        </div>
      )
    } else if (this.state.step === 'TableOfContents') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <TableOfContents
            SwitchToSessions={this.SwitchToSessions}
            SwitchToMeal={this.SwitchToMeal}
            SwitchToPersonalInfo={this.SwitchToPersonalInfo}
            SwitchToContactInfo={this.SwitchToContactInfo}
            SwitchToVehicle={this.SwitchToVehicle}
            SwitchToEmergencyContacts={this.SwitchToEmergencyContacts}
            SwitchToMedicalInfo={this.SwitchToMedicalInfo}
            SwitchToNeighborhood={this.SwitchToNeighborhood}
            SwitchToCrew={this.SwitchToCrew}
        />
          <button onClick={this.SwitchToRegister}>Back to All</button>
        </div>
      )
    } else if (this.state.step === 'Meal') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <div>Please make your selection</div>
          <Meal SelectMeal={this.SelectMeal}/>
        <button onClick={this.SwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    } else if (this.state.step === 'MealChoice') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <div>Please make your selection</div>
          <MealChoice
            sessions={this.state.sessionsWithMeals}
            mealOptions={this.state.mealOptions}
            foodPreferences={this.state.foodPreferences}
          />
        <button onClick={this.SwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    } else if (this.state.step === 'PersonalInfo') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <PersonalInfo personal={this.state.currentCamper.personal} SwitchToTOC={this.SwitchToTOC}/>
        </div>
      )
    } else if (this.state.step === 'ContactInfo') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <ContactInfo contact={this.state.currentCamper.contact} SwitchToTOC={this.SwitchToTOC}/>
        </div>
      )
    } else if (this.state.step === 'Vehicle') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <Vehicle vehicle={this.state.currentCamper.vehicle} SwitchToTOC={this.SwitchToTOC}/>
        </div>
      )
    }
    else if (this.state.step === 'EmergencyContact') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <EmergencyContact emergencyContact={this.state.currentCamper.emergencyContact} SwitchToTOC={this.SwitchToTOC}/>
        </div>
      )
    } else if (this.state.step === 'MedicalInfo') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <MedicalInfo medicalInformation={this.state.currentCamper.medicalInformation} SwitchToTOC={this.SwitchToTOC}/>
        </div>
      )
    } else if (this.state.step === 'Neighborhood') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <Neighborhood neighborhood={this.state.currentCamper.neighborhood} SwitchToTOC={this.SwitchToTOC}/>
        </div>
      )
    } else if (this.state.step === 'Crew') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <Crew/>
          <button onClick={this.SwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    } else if (this.state.step === 'Sessions') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <Sessions sessions={this.state.currentCamper.sessions} SwitchToTOC={this.SwitchToTOC}></Sessions>
        </div>
      )
    }
  }
};

export default App;