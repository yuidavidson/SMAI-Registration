import React from 'react';

import { BodyWrapper, StyledButton, ButtonWrapper } from './Styles.jsx';

const Camper = (props) => {
  return (
    <BodyWrapper>
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
      <ButtonWrapper>
        <StyledButton
          onClick={() => props.switchStep('register')}>Back to All
        </StyledButton>
      </ButtonWrapper>
    </BodyWrapper>

  )
}

export default Camper;