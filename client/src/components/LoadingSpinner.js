import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import api from "../api/api";


const SpinnerEl = styled.div`
  position: fixed;
  z-index: 8888;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: ${props => props.isHidden ? 'none': 'flex'};
  justify-content: center;
  align-items: center;

  background-color: rgba(255,255,255,${props => props.isSpinning ? .9 : 0});
  transition: background-color ${props => props.animationLength}ms ease-in;
`;
const defaultText = 'Loading...';
const initialState = true;
const Spinner = ({animationLength=500, text=null, textSetter=null}) => {
  const [state, setState] = useState(initialState);
  const [isHidden, setHidden] = useState(!initialState);
  const [isSpinning, setSpinning] = useState(initialState);

  useEffect(() => {
    api.setLoadingSetter(setState);
  }, []);

  useEffect(() => {
    if (state) { // state is ON
      setHidden(false);
      setSpinning(true);
    } else { // state is OFF
      setSpinning(false);
      setTimeout(() => {
        setHidden(true);
        if (text !== defaultText && textSetter) {
          textSetter(null); // reset to default text when state loading is OFF again
        }
      }, animationLength);
    }
  }, [state]);

  return <SpinnerEl animationLength={animationLength} isSpinning={isSpinning} isHidden={isHidden}>
    {text || defaultText}
  </SpinnerEl>
};

export default Spinner;

/*
off => on:  show, fade-in (opacity 0 => 1):  loading-status.hidden =>  loading-status =>  loading-status.spinning
on => off:  fade-in (opacity 1 -> 0), hide:  loading-status.spinning => loading-status ==1sec==> loading-status.hidden
 */