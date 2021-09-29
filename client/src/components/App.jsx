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
    this.handleNextStep = this.handleNextStep.bind(this);
  };

  handleNextStep() {
    console.log('click!');
    if (this.state.step >= 4) {
      this.setState({step: 0});
    } else {
      this.setState((prevState,) => ({
        step: prevState.step + 1
      }));
    }
  }

  render() {
    // return (
    //   // add a section showing who you are currently registering for
    //   <div>
    //     <Register account={
    //       this.state.account}
    //       camper={this.state.camper}
    //       party={this.state.party}
    //       />
    //     <Sessions sessions={this.state.sessions}></Sessions>
    //     <Meal/>
    //     <MealChoice
    //       sessions={this.state.sessionsWithMeals}
    //       mealOptions={this.state.mealOptions}
    //       foodPreferences={this.state.foodPreferences}
    //     />
    //     <EmergencyInfo/>
    //     <button onClick={this.handleNextStep}>next</button>
    //     <button>finish</button>
    //   </div>
    // )
    if (this.state.step === 0) {
      return (
        <div>
          <Register account={
            this.state.account}
            camper={this.state.camper}
            party={this.state.party}
          />
          <button onClick={this.handleNextStep}>next</button>
        </div>
      )
    } else if (this.state.step === 1) {
      return (
        <div>
          <Sessions sessions={this.state.sessions}></Sessions>
          <button onClick={this.handleNextStep}>next</button>
        </div>
      )
    } else if (this.state.step === 2) {
      return (
        <div>
          <Meal/>
          <button onClick={this.handleNextStep}>next</button>
        </div>
      )
    } else if (this.state.step === 3) {
      return (
        <div>
          <MealChoice
            sessions={this.state.sessionsWithMeals}
            mealOptions={this.state.mealOptions}
            foodPreferences={this.state.foodPreferences}
          />
          <button onClick={this.handleNextStep}>next</button>
        </div>
      )
    } else {
      return (
        <div>
          <EmergencyInfo/>
          <button onClick={this.handleNextStep}>next</button>
        </div>
      )
    }
  }
};

export default App;