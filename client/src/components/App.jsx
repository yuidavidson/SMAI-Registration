/* Components still needed:
    Basic Personal Info - name, address, email, vehicle
    Custom Pricing - amount and reason
*/

import React from 'react';
import axios from 'axios';

import Register from './Register.jsx';
// import Party from './Party.jsx';
import Sessions from './Sessions.jsx';
import Meal from './Meal.jsx';
import MealChoice from './MealChoice.jsx';
import EmergencyInfo from './EmergencyInfo.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    // dummy data for testing
    this.state = {
      step: 0,
      account: 'SMF034',
      camper: 'Joshua Freeman',
      party : [
        'Joshua Freeman',
        'Karen Freeman',
        'David Konno',
        'Shelli Smart',
        'Cedar Dobson',
      ],
      currentCamper: '',
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
    this.SetCurrentCamper = this.SetCurrentCamper.bind(this);
  };

  HandleNextStep() {
    if (this.state.step >= 4) {
      this.setState({step: 0});
    } else {
      this.setState((prevState,) => ({
        step: prevState.step + 1
      }));
    }
  }

  SetCurrentCamper(camper) {
    this.setState({currentCamper: camper});
  }

  /*

  Potentiall Try to change later to conditionally render the different 'pages' but keep the current camper and next button

  */

  render() {
    if (this.state.step === 0) {
      return (
        <div>
          <Register account={
            this.state.account}
            camper={this.state.camper}
            party={this.state.party}
            SetCurrentCamper={this.SetCurrentCamper}
          />
          <button onClick={this.HandleNextStep}>next</button>
        </div>
      )
    } else if (this.state.step === 1) {
      return (
        <div>
          <div>Registering {this.state.currentCamper}</div>
          <div>Please make your selection</div>
          <Sessions sessions={this.state.sessions}></Sessions>
          <button onClick={this.HandleNextStep}>next</button>
        </div>
      )
    } else if (this.state.step === 2) {
      return (
        <div>
          <div>Registering {this.state.currentCamper}</div>
          <div>Please make your selection</div>
          <Meal/>
          <button onClick={this.HandleNextStep}>next</button>
        </div>
      )
    } else if (this.state.step === 3) {
      return (
        <div>
          <div>Registering {this.state.currentCamper}</div>
          <div>Please make your selection</div>
          <MealChoice
            sessions={this.state.sessionsWithMeals}
            mealOptions={this.state.mealOptions}
            foodPreferences={this.state.foodPreferences}
          />
          <button onClick={this.HandleNextStep}>next</button>
        </div>
      )
    } else {
      return (
        <div>
          <div>Registering {this.state.currentCamper}</div>
          <div>Please make your selection</div>
          <EmergencyInfo/>
          <button onClick={this.HandleNextStep}>next</button>
        </div>
      )
    }
  }
};

export default App;