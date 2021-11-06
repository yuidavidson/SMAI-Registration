import React from 'react';

// EDIT: currently not using ImageWrapper, may be removed later or edited to work correctly
import { HeaderWrapper, HeaderTop, HeaderBottom, ImageWrapper, CamperWrapper, EventWrapper, NavigationWrapper } from './Styles.jsx';
import logo from '../assets/logo.jpg';

const Navigation = (props) => {
  return(
    <HeaderWrapper>
      <HeaderTop>
        <img src={logo} alt="Logo"/>
        {/* <ImageWrapper src={logo} alt="Logo"></ImageWrapper> */}
        <CamperWrapper>{props.camper}</CamperWrapper>
        <EventWrapper>Events/Camps</EventWrapper>
      </HeaderTop>
      <HeaderBottom>
        <NavigationWrapper>
          <div onClick={() => props.switchStep('events')}>{props.event.name}</div>
          <div onClick={() => props.switchStep('register')}>{props.currentCamper ? ' > ' + props.currentCamper : ''}</div>
          <div onClick={() => props.switchStep('toc')}>{(props.step !== 'toc' && props.step !== 'register') ? ' > ' + props.stepKey[props.step] : ''}
          </div>
        </NavigationWrapper>
      </HeaderBottom>
    </HeaderWrapper>
  )
}

export default Navigation;

// {(props.step !== 'toc' || props.step !== 'register') ? ' > ' + props.step : ''}