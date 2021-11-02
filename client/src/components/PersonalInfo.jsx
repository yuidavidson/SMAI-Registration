import React from 'react';
import axios from 'axios';

import UnsavedWarning from './UnsavedWarning.jsx';
import { BodyWrapper, StyledButton, ButtonWrapper } from './Styles.jsx';

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: '',
      change: false,
      personal: props.personal,
      switchStep: props.switchStep,
      openModal: props.openModal,
    };
    this.editPersonalInfo = this.editPersonalInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.savePersonalInfo = this.savePersonalInfo.bind(this);
    this.handleSwitchToTOC = this.handleSwitchToTOC.bind(this);
  }

  editPersonalInfo() {
    this.setState({step: 'Personal'});
  }

  handleChange(e) {
    let editedCamper = this.state.personal;
    editedCamper[e.target.name] = e.target.value;
    this.setState({personal: editedCamper, change: true});
  }

  // https://smai.us/api/camper/update?id=1https://smai.us/api/camper/add?id=1

  savePersonalInfo() {

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
        console.log('Saved');
        // console.log(response);
        this.setState({change: false});
      })
      .catch((error) => {
        console.log('Sorry, something went wrong');
        console.log(error);
      })
    }
  }

// Function for if a user tries to return to TOC without saving, to give a warning
// EDIT: change to switch to be on screen with a yes or no to return to TOC

  handleSwitchToTOC() {
    if (this.state.change) {
      console.log('You have unsaved changes. Are you sure you want to continue?');
      this.props.openModal('unsavedWarning');
    } else {
      this.props.switchStep('toc');
    }
  }

  render() {
    if (!this.state.step) {
      return (
        <BodyWrapper>
          <div>Personal Information</div>
          <div>Last updated: A long time ago</div>
          <ButtonWrapper>
            <StyledButton onClick={this.editPersonalInfo}>Update Information</StyledButton>
            <StyledButton onClick={this.handleSwitchToTOC}>Return to Table of Contents</StyledButton>
          </ButtonWrapper>
        </BodyWrapper>
      )
    } else if (this.state.step === 'Personal') {
      return (
        <BodyWrapper>
          <div>First Name</div>
          <input type='text' name='firstName' value={this.state.personal.firstName} onChange={this.handleChange}/>
          <div>Last Name</div>
          <input type='text' name='lastName' value={this.state.personal.lastName} onChange={this.handleChange}/>
          <div>Birthday</div>
          <input type='text' name='bday'value={this.state.personal.bday} onChange={this.handleChange}/>
          <div>Food Preference</div>
          <input type='text' name='foodPreference' value={this.state.personal.foodPreference} onChange={this.handleChange}/>
          <div>Neighborhood</div>
          <input type='text' name='neighborhood' value={this.state.personal.neighborhood} onChange={this.handleChange}/>
          <ButtonWrapper>
            <StyledButton onClick={this.savePersonalInfo}>Save</StyledButton>
            <StyledButton onClick={this.handleSwitchToTOC}>Return to Table of Contents</StyledButton>
          </ButtonWrapper>
          <UnsavedWarning
            modalState={this.props.modalState}
            closeModal={this.props.closeModal}
            switchAndClose={this.props.switchAndClose}
          ></UnsavedWarning>
        </BodyWrapper>
      )
    }
  }
}

export default PersonalInfo;