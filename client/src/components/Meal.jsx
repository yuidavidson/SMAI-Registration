import React from 'react';

const Meal = (props) => {
  return (
    // include in state of which choice is made and continues to mealchoice or emergencyinfo
    <div>
      <div>Do you want to purchase a meal plan at the kitchen?</div>
      <div>
        <button onClick={() => props.SelectMeal(true)}>x</button>
        Yes
      </div>
      <div>
        <button onClick={() => props.SelectMeal(false)}>x</button>
        No
      </div>
    </div>
  )
};

export default Meal;