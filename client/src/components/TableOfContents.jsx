import React from 'react';

const TableOfContents = (props) => {
  return (
    <div>
      <div>Registeration Table of Contents</div>
      <div
        onClick={() => props.switchStep('personal')}
      >Personal Information</div>
      <div
        onClick={() => props.switchStep('contact')}
      >Contact Information</div>
      <div
        onClick={() => props.switchStep('vehicle')}
      >Vehicles</div>
      <div
        onClick={() => props.switchStep('emergency')}
      >Emergency Contact</div>
      <div
        onClick={() => props.switchStep('medical')}
      >Medical Info</div>
      <div
        onClick={() => props.switchStep('neighborhood')}
      >Neighborhood</div>
      <div
        onClick={() => props.switchStep('sessions')}
      >Sessions, Crew, and Meals</div>
    </div>

  )
}

export default TableOfContents;