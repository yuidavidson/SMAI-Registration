/*
  Components still needed:
  Payment
    Custom Pricing - amount and reason
*/

import React from 'react';
import axios from 'axios';

import TableOfContents from './TableOfContents.jsx';
import Register from './Register.jsx';
import Sessions from './Sessions.jsx';
import Meal from './Meal.jsx';
import MealChoice from './MealChoice.jsx';
import EmergencyInfo from './EmergencyInfo.jsx';
import PersonalInfo from './PersonalInfo.jsx';
import Vehicle from './Vehicle.jsx';
// import Camping from './Camping.jsx';
import EmergencyContact from './EmergencyContact.jsx';
import Neighborhood from './Neighborhood.jsx';
import Crew from './Crew.jsx';

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
        sessions: [],
        meal: false,
        mealChoice: {},
        medicalInformation: {},
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
    this.HandleNextStep = this.HandleNextStep.bind(this);
    this.HandlePrevStep = this.HandlePrevStep = this.HandlePrevStep.bind(this);
    this.SwitchToTOC = this.SwitchToTOC.bind(this);
    this.SwitchToRegister = this.SwitchToRegister.bind(this);

    this.SetCurrentCamper = this.SetCurrentCamper.bind(this);

    this.OpenCamperInvite = this.OpenCamperInvite.bind(this);
    this.CloseCamperInvite = this. CloseCamperInvite.bind(this);
    this.OpenCamperSearch = this.OpenCamperSearch.bind(this);
    this.CloseCamperSearch = this.CloseCamperSearch.bind(this);

    this.SwitchToSessions = this.SwitchToSessions.bind(this);
    this.SwitchToMeal = this.SwitchToMeal.bind(this);
    this.SwitchToMedicalInfo = this.SwitchToMedicalInfo.bind(this);
    this.SwitchToPersonalInfo = this.SwitchToPersonalInfo.bind(this);
    this.SwitchToVehicle = this.SwitchToVehicle.bind(this);
    // might remove this bind for camping
    this.SwitchToCamping = this.SwitchToCamping.bind(this);
    this.SwitchToEmergencyContacts = this.SwitchToEmergencyContacts.bind(this);
    this.SwitchToNeighborhood = this.SwitchToNeighborhood.bind(this);
    this.SwitchToCrew = this.SwitchToCrew.bind(this);

    this.SelectSessions = this.SelectSessions.bind(this);
    this.SelectMeal = this.SelectMeal.bind(this);
    this.SelectMealChoice = this.SelectMealChoice.bind(this);
    this.SelectMealPreference = this.SelectMealPreference.bind(this);
    this.UpdateMedicalInformation = this.UpdateMedicalInformation.bind(this);
  };

  // Both HandleNextStep and HandlePrevStep to be removed if found not necessary

  HandleNextStep() {
    if (!this.state.readyForNextStep) {
      // EDIT: to show on page
      console.log('please choose a camper to register');
    } else if (this.state.step >= 5) {
      this.setState({step: 0});
      // EDIT: set readyForNextStep to be false after other button functionalities are made
    } else {
      this.setState((prevState,) => ({
        step: prevState.step + 1
        // EDIT: set readyForNextStep to be false after other button functionalities are made
      }));
    }
  }

  HandlePrevStep() {
    if (!this.state.readyForNextStep) {
      // EDIT: to show on page
      console.log('please choose a camper to register');
    } else if (this.state.step <= 0) {
      this.setState({step: 5});
    } else {
      this.setState((prevState,) => ({
        step: prevState.step - 1
      }));
    }
  }

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

  // Return from current component (ex. Personal Information) back to the table of contents
  SwitchToTOC() {
    // EDIT: add a warning if data was not saved
    this.setState({step: 'TableOfContents'});
  }

  // Return from TOC to camper selection
  SwitchToRegister() {
    this.setState({step: 'Register'});
  }

  SetCurrentCamper(partyMember) {
    let newData = this.state.currentCamper;
    newData.camper = partyMember.camper;
    this.setState({currentCamper: newData});
    // this.setState({readyForNextStep: true});
    this.setState({step: 'TableOfContents'});
  }

  // Switches to Selected sections depending on TOC clicks

  SwitchToSessions() {
    this.setState({step: 'Sessions'});
  }

  SwitchToMeal() {
    this.setState({step: 'Meal'})
  }

  SwitchToMedicalInfo() {
    this.setState({step: 'EmergencyInfo'});
  }

  SwitchToPersonalInfo() {
    this.setState({step: 'PersonalInfo'});
  }

  SwitchToVehicle() {
    this.setState({step: 'Vehicle'});
  }

  //still not sure what this component should contain and might be edited and removed
  SwitchToCamping() {
    this.setState({step: 'Camping'});
  }

  SwitchToEmergencyContacts() {
    this.setState({step: 'EmergencyContact'});
  }

  SwitchToNeighborhood() {
    this.setState({step: 'Neighborhood'});
  }

  SwitchToCrew() {
    this.setState({step: 'Crew'});
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

  SelectMealChoice() {

  }

  SelectMealPreference() {

  }

  UpdateMedicalInformation() {

  }

  /*
  EDIT:
  Potentiall Try to change later to conditionally render the different 'pages' but keep the current camper and next button

  */

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
          {/* <button onClick={this.SwitchToTOC}>next</button> */}
        </div>
      )
      // Edit: might change this into -1 step, but might take the numbers out entirely
    } else if (this.state.step === 'TableOfContents') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <TableOfContents
            SwitchToSessions={this.SwitchToSessions}
            SwitchToMeal={this.SwitchToMeal}
            SwitchToMedicalInfo={this.SwitchToMedicalInfo}
            SwitchToPersonalInfo={this.SwitchToPersonalInfo}
            SwitchToVehicle={this.SwitchToVehicle}
            // Potentially removing or editing camping
            SwitchToCamping={this.SwitchToCamping}
            SwitchToEmergencyContacts={this.SwitchToEmergencyContacts}
            SwitchToNeighborhood={this.SwitchToNeighborhood}
            SwitchToCrew={this.SwitchToCrew}
        />
          <button onClick={this.SwitchToRegister}>Back to All</button>
        </div>
      )
    } else if (this.state.step === 'Sessions') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <div>Please make your selection</div>
          <Sessions
          sessions={this.state.sessions}
          SelectSessions={this.SelectSessions}
          ></Sessions>
        <button onClick={this.SwitchToTOC}>Return to Table of Contents</button>
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
    } else if (this.state.step === 'EmergencyInfo') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <EmergencyInfo/>
        <button onClick={this.SwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    } else if (this.state.step === 'PersonalInfo') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <PersonalInfo/>
          <button onClick={this.SwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    } else if (this.state.step === 'Vehicle') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <Vehicle/>
          <button onClick={this.SwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    }
    // Camping component which we still do not know what it contains
    // else if (this.state.step === 'Camping') {
    //   return (
    //     <div>
    //       <div>Registering {this.state.currentCamper.camper}</div>
    //       <Camping/>
    //       <button onClick={this.SwitchToTOC}>Return to Table of Contents</button>
    //     </div>
    //   )
    // }
    else if (this.state.step === 'EmergencyContact') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <EmergencyContact/>
          <button onClick={this.SwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    } else if (this.state.step === 'Neighborhood') {
      return (
        <div>
          <div>Registering {this.state.currentCamper.camper}</div>
          <Neighborhood/>
          <button onClick={this.SwitchToTOC}>Return to Table of Contents</button>
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
    }
  }
};

export default App;