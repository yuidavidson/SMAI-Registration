/*
  EDIT: need to add lastUpdated
*/

import React from 'react';
import axios from 'axios';

import { StyledButton, ButtonWrapper } from './Styles.jsx';

class EmergencyContact extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        step: '',
        change: false,
        emergencyContact: props.emergencyContact,
        switchStep: props.switchStep,
      };
    this.editEmergencyContact = this.editEmergencyContact.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveEmergencyContact = this.saveEmergencyContact.bind(this);
    this.handleSwitchToTOC = this.handleSwitchToTOC.bind(this);
  }

  editEmergencyContact () {
    this.setState({step: 'emergencyContact'});
    }

  handleChange(e) {
    let editedCamper = this.state.emergencyContact;
    editedCamper[e.target.name] = e.target.value;
    this.setState({emergencyContact: editedCamper, change: true});
    }

  saveEmergencyContact() {

    let dataEncoded = Object.entries(this.state.emergencyContact).map(e => encodeURIComponent(e[0])+'='+encodeURIComponent(e[1])).join('&')
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
    } else {
      this.state.switchStep('toc');
    }
  }

  render () {
    if (!this.state.step) {
      return(
        <div>
          <div>Emergency Contacts</div>
          <div>Last updated: A long time ago</div>
          <ButtonWrapper>
            <StyledButton onClick={this.editEmergencyContact}>Update Information</StyledButton>
            <StyledButton onClick={this.handleSwitchToTOC}>Return to Table of Contents</StyledButton>
          </ButtonWrapper>
        </div>
      )
    } else if (this.state.step === 'emergencyContact') {
      return (
        <div>
          <div>Contact 1 First Name</div>
          <input type='text' name='emergency1FirstName' value={this.state.emergencyContact.emergency1FirstName} onChange={this.handleChange}/>
          <div>Contact 1 Last Name</div>
          <input type='text' name='emergency1LastName' value={this.state.emergencyContact.emergency1LastName} onChange={this.handleChange}/>
          <div>Contact 1 Relationship</div>
          <input type='text' name='emergency1Relationship' value={this.state.emergencyContact.emergency1Relationship} onChange={this.handleChange}/>
          <div>Contact 1 Phone Number</div>
          <input type='text' name='emergency1Phone' value={this.state.emergencyContact.emergency1Phone} onChange={this.handleChange}/>
          <div>Contact 1 Location</div>
          <input type='text' name='emergency1Location' value={this.state.emergencyContact.emergency1Location} onChange={this.handleChange}/>
          <div>Contact 2 First Name</div>
          <input type='text' name='emergency2FirstName' value={this.state.emergencyContact.emergency2FirstName} onChange={this.handleChange}/>
          <div>Contact 2 Last Name</div>
          <input type='text' name='emergency2LastName' value={this.state.emergencyContact.emergency2LastName} onChange={this.handleChange}/>
          <div>Contact 2 Relationship</div>
          <input type='text' name='emergency2Relationship' value={this.state.emergencyContact.emergency2Relationship} onChange={this.handleChange}/>
          <div>Contact 2 Phone Number</div>
          <input type='text' name='emergency2Phone' value={this.state.emergencyContact.emergency2Phone} onChange={this.handleChange}/>
          <div>Contact 2 Location</div>
          <input type='text' name='emergency2Location' value={this.state.emergencyContact.emergency2Location} onChange={this.handleChange}/>
          <ButtonWrapper>
            <StyledButton onClick={this.saveEmergencyContact}>Save</StyledButton>
            <StyledButton onClick={this.handleSwitchToTOC}>Return to Table of Contents</StyledButton>
          </ButtonWrapper>
        </div>
      )
    }
  }
}

export default EmergencyContact;