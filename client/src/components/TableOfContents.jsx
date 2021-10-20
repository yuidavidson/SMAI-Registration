import React from 'react';

const TableOfContents = (props) => {
  return (
    <div>
      <div>Registeration Table of Contents</div>
      <div>Personal/Contact</div>
      <div>Vehicles</div>
      <div>Camping</div>
      <div>Emergency Contact</div>
      <div onClick={() => props.SwitchToMedicalInfo()}>Medical Info</div>
      <div>Neighborhood</div>
      <div onClick={() => props.SwitchToSessions()}>Sessions</div>
      <div>Crew</div>
      <div onClick={() => props.SwitchToMeal()}>Meals</div>
      <div>Review and Pay</div>
    </div>

  )
}

export default TableOfContents;