import React from 'react';

import { BodyWrapper, StyledButton, ButtonWrapper, StyledHead, StyledClickableDiv, ContentWrapper } from './Styles.jsx';

const Camper = (props) => {
  return (
    <BodyWrapper>
      <StyledHead fontSize={20}>Registeration Table of Contents</StyledHead>
      <ContentWrapper>
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
      </ContentWrapper>
      <ButtonWrapper>
        <StyledButton
          onClick={() => props.switchStep('register')}>Back to All
        </StyledButton>
      </ButtonWrapper>
    </BodyWrapper>

  )
}

export default Camper;