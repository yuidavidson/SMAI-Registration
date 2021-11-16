import React from 'react';

import { BodyWrapper, StyledButton, ButtonWrapper, StyledHeader, StyledClickableDiv } from './Styles.jsx';

const Camper = (props) => {
  return (
    <BodyWrapper>
      <StyledHeader>Registeration Table of Contents</StyledHeader>
      <StyledClickableDiv
        onClick={() => props.switchStep('personal')}
      >Personal Information</StyledClickableDiv>
      <StyledClickableDiv
        onClick={() => props.switchStep('contact')}
      >Contact Information</StyledClickableDiv>
      <StyledClickableDiv
        onClick={() => props.switchStep('vehicle')}
      >Vehicles</StyledClickableDiv>
      <StyledClickableDiv
        onClick={() => props.switchStep('emergency')}
      >Emergency Contact</StyledClickableDiv>
      <StyledClickableDiv
        onClick={() => props.switchStep('medical')}
      >Medical Info</StyledClickableDiv>
      <StyledClickableDiv
        onClick={() => props.switchStep('neighborhood')}
      >Neighborhood</StyledClickableDiv>
      <StyledClickableDiv
        onClick={() => props.switchStep('sessions')}
      >Sessions, Crew, and Meals</StyledClickableDiv>
      <ButtonWrapper>
        <StyledButton
          onClick={() => props.switchStep('register')}>Back to All
        </StyledButton>
      </ButtonWrapper>
    </BodyWrapper>

  )
}

export default Camper;