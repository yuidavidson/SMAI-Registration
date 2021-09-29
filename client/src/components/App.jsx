import React from 'react';
import axios from 'axios';

import Party from './Party.jsx';
import Sessions from './Sessions.jsx';
import Meal from './Meal.jsx';
import MealChoice from './MealChoice.jsx';
import EmergencyInfo from './EmergencyInfo.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    // dummy data for testing
    this.state = {
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
  };

  render() {
    return (
      // add a section showing who you are currently registering for
      <div>
        <div>Account {this.state.account}</div>
        <div>{this.state.camper}</div>
        <div>Who will you register?</div>
        <div>choose one</div>
        {/* add edit button for each camper and also a marker to show it was finished */}
        <Party party={this.state.party}/>
        <button>next</button>
        <Sessions sessions={this.state.sessions}></Sessions>
        <Meal/>
        <MealChoice
          sessions={this.state.sessionsWithMeals}
          mealOptions={this.state.mealOptions}
          foodPreferences={this.state.foodPreferences}
        />
        <EmergencyInfo/>
      </div>
    )
  }
};

export default App;