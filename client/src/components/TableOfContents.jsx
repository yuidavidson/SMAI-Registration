import React from 'react';

const TableOfContents = (props) => {
  return (
    <div>
      <div>Registeration Table of Contents</div>
      <div onClick={() => props.SwitchToPersonalInfo()}>Personal Information</div>
      <div onClick={() => props.SwitchToContactInfo()}>Contact Information</div>
      <div onClick={() => props.SwitchToVehicle()}>Vehicles</div>
      <div onClick={() => props.SwitchToEmergencyContacts()}>Emergency Contact</div>
      <div onClick={() => props.SwitchToMedicalInfo()}>Medical Info</div>
      <div onClick={() => props.SwitchToNeighborhood()}>Neighborhood</div>
      <div onClick={() => props.SwitchToSessions()}>Sessions, Crew, and Meals</div>
    </div>

  )
}

export default TableOfContents;