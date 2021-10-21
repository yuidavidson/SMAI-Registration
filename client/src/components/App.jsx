/*
  Components still needed:
    Basic Personal Info - name, address, email, vehicle
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

class App extends React.Component {
  constructor(props) {
    super(props);
    // dummy data for testing
    this.state = {
      // EDIT: might be good to change the steps from numbers to strings/titles of each steps -> would be easier for future edits
      step: 'Register',
      readyForNextStep: false,
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
    this.SwitchToSessions = this.SwitchToSessions.bind(this);
    this.SwitchToMeal = this.SwitchToMeal.bind(this);
    this.SwitchToMedicalInfo = this.SwitchToMedicalInfo.bind(this);
    this.SelectSessions = this.SelectSessions.bind(this);
    this.SelectMeal = this.SelectMeal.bind(this);
    this.SelectMealChoice = this.SelectMealChoice.bind(this);
    this.SelectMealPreference = this.SelectMealPreference.bind(this);
    this.UpdateMedicalInformation = this.UpdateMedicalInformation.bind(this);
  };

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
    this.setState({readyForNextStep: true});
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
            SetCurrentCamper={this.SetCurrentCamper}
          />
          <button onClick={this.SwitchToTOC}>next</button>
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
          <div>Please make your selection</div>
          <EmergencyInfo/>
        <button onClick={this.SwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    }
  }
};

export default App;