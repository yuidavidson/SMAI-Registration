import React from 'react';

const MealPreference = (props) => {
  const mealOptions = props.mealOptions;
  const mealOptionList = mealOptions.map((mealOption) =>
    <div key={mealOption.toString()}>
      <button>x</button>
      {mealOption}
    </div>
  );
  return (
    <div>{mealOptionList}</div>
  )
}

export default MealPreference;