import styled, { keyframes } from 'styled-components';

/*
========== General Styles ==========
*/

export const BodyWrapper = styled.div`
display: flex;
flex-direction: column;
margin: 5px;
border: solid 2px black;
border-radius: 5px;
padding: 5px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1px;
  // border: solid 1px black;
  padding: 1px;
`;

export const HeaderTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 1px;
  border-bottom: solid 5px #bd394b;
  border-radius: 10px;
  padding: 1px;
`;

export const HeaderBottom = styled.div`
  display: flex;
  justify-content: center;
  margin: 1px;
  // border: solid 1px black;
  padding: 1px;
`;

export const ImageWrapper = styled.img`
  height: 60px;
  width: 60px;
  // don't need this after the image is placed
  align-items: center;
  margin: 1px;
  border: solid 1px black;
  border-radius: 60px;
  padding: 1px;
  background: green;
`;

export const CamperWrapper = styled.div`
  diplay: flex;
  height: 30px;
  width: 200px;
  text-align: center;
  font-size: 25px;
  color: #bd394b;
  margin: 1px;
  // border: solid 1px black;
  padding: 1px;
`;

export const EventWrapper = styled.div`
  diplay: flex;
  height: 30px;
  width: 100px;
  text-align: center;
  font-size: 25px;
  color: #bd394b;
  margin: 1px;
  // border: solid 1px black;
  padding: 1px;
`;

export const NavigationWrapper = styled.div`
  display: flex;
  height: 30px;
  width: 500px;
  text-align: center;
  font-size: 20px;
  margin: 1px;
  // border: solid 1px black;
  padding: 1px;

`;

/*
========== DropDown Styles ==========
*/

export const DropDownWrapper = styled.form`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  margin: 2px;
  padding: 2px;

`;

export const StyledSelect = styled.select`
  width: 200px;
  height: 100%;
  padding: 2px;
  margin: 2px;
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
  margin: 7px;
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

export const ButtonWrapper = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

// EDIT: work in progress to have a wrapper for the SmallButton/BoolSwitch but currently not working as wanted

export const SmallButtonWrapper = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  // align-items: center;
`;

export const StyledSmallButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14px;
  height: 14px;
  // margin: 5px;
  padding: 1px;
  border: solid black 1px;
  border-radius: 10px;
  background:${(props) => props.isOn ? 'cyan' : 'white'};
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

export const OverlayBackground = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0000003a;
  animation: ${fadeIn} 0.5s;
`;
