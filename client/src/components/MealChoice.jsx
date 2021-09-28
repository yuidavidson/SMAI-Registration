import React from 'react';

import MealPreference from './MealPreference.jsx';

const MealChoice = (props) => {
  const sessions = props.sessions;
  const sessionList = sessions.map((session) =>
    <div key={session.toString()}>
      {session}
      <MealPreference
        mealOptions={props.mealOptions}
      />
      {/* create a drop down menu with all food preferences */}
      <button>Meat</button>
    </div>
  );
  return (
    <div>{sessionList}</div>
  )
};

export default MealChoice;