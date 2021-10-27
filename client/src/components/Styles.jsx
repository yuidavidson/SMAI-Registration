import styled, { keyframes } from 'styled-components';

/*
========== DropDown Styles ==========
*/

export const DropDownWrapper = styled.form`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
`;

export const StyledSelect = styled.select`
  max-width: 50%;
  height: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

export const StyledOption = styled.option`
  color: ${(props) => (props.selected ? "lightgrey" : "black")};
`;


// At the moment this is not being used but keeping it for now, because it might come in handy later
export const StyledLabel = styled.label`
  margin-bottom: 1rem;
`;

/*
========== Button Styles ==========
*/


// add transition for color change on hover and click
export const StyledButton = styled.button`
  // max-width: 50%;
  // height: 100%;
  // display: flex;
  // justify-content: center;
  border: solid 2px #99a39c;
  padding: 7px;
  border-radius: 10px;
  background: #91cfa1;

  &:hover {
    background: #53c976;
    border-color: #868787;
    transition: 0.5s;
  }
  &:active {
    background: #2491d1;
    border-color: #2b2b2b;
    color: #ffffff;
    transition: 0.5s;
  }
`;

/*
========== Modal Styles ==========
*/

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const StyledModal = styled.div`
  width: 220px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20;
  position: fixed;
  top: 20%;
  left: 50%;
  margin: 10px;
  border: solid 2px black;
  border-radius: 10px;
  padding: 10px;
  background: white;
`;

export const Overlay = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0000003a;
  animation: ${fadeIn} 1s;
`;
