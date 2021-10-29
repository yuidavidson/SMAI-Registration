import React from 'react';

import { HeaderWrapper, HeaderTop, HeaderBottom, ImageWrapper, CamperWrapper, EventWrapper, NavigationWrapper } from './Styles.jsx';
// import logo from '../assets/logo.jpg';

const Navigation = (props) => {
  return(
    <HeaderWrapper>
      <HeaderTop>
        {/* <img src={logo} alt="Logo"/> */}
        <ImageWrapper>Frog</ImageWrapper>
        <CamperWrapper>{props.camper}</CamperWrapper>
        <EventWrapper>Events/Camps</EventWrapper>
      </HeaderTop>
      <HeaderBottom>
        {/* <NavigationWrapper>{props.event} {props.currentCamper ? ' > ' + props.currentCamper : ''} {(props.step !== 'toc' || props.step !== 'register') ? ' > ' + props.step : ''}</NavigationWrapper> */}
        <NavigationWrapper>
          <div>{props.event}</div>
          <div onClick={() => props.switchStep('register')}>{props.currentCamper ? ' > ' + props.currentCamper : ''}</div>
          <div>{(props.step !== 'toc' || props.step !== 'register') ? ' > ' + props.step : ''}</div>
        </NavigationWrapper>
      </HeaderBottom>
    </HeaderWrapper>
  )
}

export default Navigation;

// {(props.step !== 'toc' || props.step !== 'register') ? ' > ' + props.step : ''}