import React from 'react';
import axios from 'axios';

import UnsavedWarning from './UnsavedWarning.jsx';
import Overlay from './Overlay.jsx';
import { BodyWrapper, StyledButton, ButtonWrapper } from './Styles.jsx';

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.stepConfig = props.stepConfig;
    this.state = {
      step: '',
      change: false,
      personal: props.personal,
      switchStep: props.switchStep,
      openModal: props.openModal
    };
    this.EditPersonalInfo = this.EditPersonalInfo.bind(this);
    this.HandleChange = this.HandleChange.bind(this);
    this.SavePersonalInfo = this.SavePersonalInfo.bind(this);
    this.HandleSwitchToTOC = this.HandleSwitchToTOC.bind(this);
  }

  EditPersonalInfo() {
    this.setState({step: 'Personal'});
  }

  HandleChange(e) {
    let editedCamper = this.state.personal;
    editedCamper[e.target.name] = e.target.value;
    this.setState({personal: editedCamper, change: true});
  }

  SavePersonalInfo() {
    let dataEncoded = Object.entries(this.state.personal).map(e => encodeURIComponent(e[0])+'='+encodeURIComponent(e[1])).join('&')
    dataEncoded += `&id=${this.props.camperId}`;

    if (!this.state.change) {
      console.log('no changes detected to be saved!');
    } else {
      axios({
        method: 'POST',
        url: 'https://smai.us/api/camper/update',
        data: dataEncoded,
      })
      .then((response)  => {
        console.log(response);
        if (response.data.status === 'success') {
          this.props.updateCamper(this.props.name, this.state.personal);
          this.setState({change: false});
        } else {
          console.log('Sorry, something went wrong: ' + response.error);
        }
      })
      .catch((error) => {
        console.log('Sorry, something went wrong');
        console.log(error);
      })
    }
  }

// Function for if a user tries to return to TOC without saving, to give a warning
// EDIT: change to switch to be on screen with a yes or no to return to TOC

  HandleSwitchToTOC() {
    if (this.state.change) {
      console.log('You have unsaved changes. Are you sure you want to continue?');
      this.props.openModal('unsavedWarning');
    } else {
      this.props.openModal(''); // make sure to close modal before switching
      this.props.switchStep('toc');
    }
  }

  render() {
    if (!this.state.step) {
      return (
        <BodyWrapper>
          <div>{this.stepConfig.label}</div>
          <div>Last updated: A long time ago</div>
          <ButtonWrapper>
            <StyledButton onClick={this.EditPersonalInfo}>Update Information</StyledButton>
            <StyledButton onClick={this.HandleSwitchToTOC}>Return to Table of Contents</StyledButton>
          </ButtonWrapper>
        </BodyWrapper>
      )
    } else if (this.state.step === 'Personal') {
      return (
        <BodyWrapper>
            {this.stepConfig.fields.map(fieldName =>
                <div key={fieldName}>
                    <div>{fieldName}</div>
                    <input type='text' name={fieldName} value={this.state.personal[fieldName]} onChange={this.HandleChange}/>
                </div>
            )}

          <ButtonWrapper>
            <StyledButton onClick={this.SavePersonalInfo}>Save</StyledButton>
            <StyledButton onClick={this.HandleSwitchToTOC}>Return to Table of Contents</StyledButton>
          </ButtonWrapper>
          <Overlay
            myId='unsavedWarning'
            currentId={this.props.modalState}
            close={this.props.closeModal}
          >
              <UnsavedWarning noFn={this.props.closeModal} yesFn={this.props.switchAndClose.bind(this, 'toc')}/>
          </Overlay>
        </BodyWrapper>
      )
    }
  }
}

export default PersonalInfo;