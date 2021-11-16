import styled, { keyframes, css } from 'styled-components';

/*
========== Keyframe Animations ==========
*/

const borderChange = keyframes`
0% {
  height: auto;
  width: auto;
}
100%{
  height: auto;
  width: auto;
}
`;

const borderGrow = keyframes`
0% {
  height: 0px;
  width: 0px;
}
100%{
  height: 27px;
  width: 250px;
}
`;

const borderShrink = keyframes`
0% {
  height: 27px;
  width: 250px;
}
100%{
  height: 0px;
  width: 0px;
}
`;

/*
========== General Styles ==========
*/

export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  // height: 30px;
  // width: auto;
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
  width: auto;
  text-align: center;
  font-size: 25px;
  color: #bd394b;
  margin: 1px;
  // border: solid 1px black;
  padding: 1px;
`;

export const NavigationWrapper = styled.div`
  display: flex;
  height: auto;
  width: auto;
  // height: ${(props) => props.step === 'events' ? '0' : '27px'};
  // width: ${(props) => props.step === 'events' ? '0' : '250px'};
  // text-align: center;
  justify-content: space-around;
  font-size: 20px;
  margin: 1px;
  border: outset 3px #91cfa1;
  border-radius: 10px;
  padding: 1px;
  // TODO: figure out how to make this animation work correctly => want the boarder of the navigation to change depending on the content
  // animation: ${
    (props) => props.step === 'events'  && !props.isFirstRender ? borderShrink : ((props) => props.step !== 'events' ? borderGrow : null)
  } 2s;
`;

export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledHeader = styled.h2`
  padding: 5px;
  font-size: 20px;
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

/*
========== DropDown Styles ==========
*/

export const DropDownWrapper = styled.div`
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
  cursor:pointer;

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
  cursor:pointer;
`;

export const StyledXButton = styled.button`
  width: 20px;
  height: 20px;
  float:right;
  margin-top: -17px;
  margin-left: -17px;
  padding: 0;
  cursor:pointer;
  border: 2px groove #d96d64;
  border-radius: 20px;
  background: #c45c49;
  font-weight: bold;
  display: inline-block;
  line-height: 0px;
  &:hover {
    background: #db3d21;
  }
`;

export const StyledEditButton = styled.button`
  color: green;
  text-decoration: underline;
  cursor: pointer;
  border: 0;
  background: white;
`;

export const StyledClickableDiv = styled.div`
  cursor: pointer;
  &:hover {
    // color: #666665;
    opacity: 0.65;
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
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 20;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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

/*
========== Error Styles ==========
*/

export const StyledStringError = styled.div`
  width: 250px;
  height: 20px;
  text-align: center;
  margin: 2px;
  border: solid 2px #b55e5e;
  border-radius: 10px;
  padding: 2px;
  background: #e89292;
`;

export const StyledObjectError = styled.div`
  text-align: center;
  margin: 0 2px;
  border: solid 2px #b55e5e;
  border-radius: 4px;
  padding: 0 2px;
  background: #e89292;
`;

export const InputErrorWrapper = styled.span`
  display: flex;
  flex-direction: row;
`;

/*
========== Image Styles ==========
*/

export const StyledCheckMark = styled.img`
  display: flex;
  height: 12px;
  width: 12px;
  justify-content: center;
  align-items: center;
`;