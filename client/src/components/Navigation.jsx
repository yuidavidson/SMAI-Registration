import React, { useState, useEffect } from 'react';

// EDIT: currently not using ImageWrapper, may be removed later or edited to work correctly
import { HeaderWrapper, HeaderTop, HeaderBottom, ImageWrapper, CamperWrapper, EventWrapper, NavigationWrapper, StyledClickableDiv } from './Styles.jsx';
import logo from '../assets/logo.jpg';

const Navigation = (props) => {
  const stepLabels = {
      register: 'Camper Selection',
      toc: 'Table of Contents',
      personal: 'Personal Information',
      contact: 'Contact Information',
      vehicle: 'Vehicle Information',
      emergency: 'Emergency Contact',
      medical: 'Medical Information',
      neighborhood: 'Neighborhood',
      sessions: 'Sessions',
  };
  // TODO: was trying to animate the navigation border not on first render but was not working how I wanted it to. Either fix this problem or remove these parts
  const [isFirstRender, setIsFirstRender] = useState(true);
  // const [width, setWidth] = useState(0);
  // const [length, setLength] = useState(0);

  // useEffect (() => {
  //   let nav = document.getElementsByClassName('navigation');
  //   setLength(nav[0].clientWidth);
  //   setWidth(nav[0].clientHeight);
  //   console.log(nav);
  //   console.log(nav[0].clientWidth);
  //   // setIsFirstRender(false);
  // });

  return(
    <HeaderWrapper>
      <HeaderTop>
        <img src={logo} alt="Logo"/>
        {/* <ImageWrapper src={logo} alt="Logo"></ImageWrapper> */}
        <CamperWrapper>{props.camper}</CamperWrapper>
        <EventWrapper>
          <StyledClickableDiv onClick={() => props.switchStep('events')}>
            Events/Camps
          </StyledClickableDiv>
        </EventWrapper>
      </HeaderTop>
      <HeaderBottom>
        <NavigationWrapper className="navigation"
        key={props.step}
        step={props.step} isFirstRender={isFirstRender} setIsFirstRender={setIsFirstRender}>
          <StyledClickableDiv onClick={() => props.switchStep('events')}>{props.step !== 'events' ? props.event.name : null}</StyledClickableDiv>
          <StyledClickableDiv onClick={() => props.switchStep('register')}>{props.currentCamper  && props.step !== 'events' ? ' > ' + props.currentCamper : ''}</StyledClickableDiv>
          <StyledClickableDiv onClick={() => props.switchStep('toc')}>{(props.step !== 'events' && props.step !== 'toc' && props.step !== 'register' && props.step !== 'stripe') ? ' > ' + stepLabels[props.step] : ''}
          </StyledClickableDiv>
        </NavigationWrapper>
      </HeaderBottom>
    </HeaderWrapper>
  )
}

export default Navigation;
