import React from 'react';
import axios from 'axios';

import { BodyWrapper, StyledButton, ButtonWrapper } from './Styles.jsx';

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: '',
      change: false,
      contact: props.contact,
      switchStep: props.switchStep,
    };
    this.editContactInfo = this.editContactInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveContactInfo = this.saveContactInfo.bind(this);
    this.handleSwitchToTOC = this.handleSwitchToTOC.bind(this);
  }

  editContactInfo() {
    this.setState({step: 'Contact'});
  }

  handleChange(e) {
    let editedCamper = this.state.contact;
    editedCamper[e.target.name] = e.target.value;
    this.setState({contact: editedCamper, change: true});
  }

  saveContactInfo() {
    if (!this.state.change) {
      console.log('no changes detected to be saved!');
    } else {
      axios({
        method: 'POST',
        url: 'https://smai.us/api/save-value',
        params: {
          // probably using this.state.personal
        },
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

  render() {
    if (!this.state.step) {
      return (
        <BodyWrapper>
          <div>Contact Information</div>
          <div>Last updated: A long time ago</div>
          <ButtonWrapper>
            <StyledButton onClick={this.editContactInfo}>Update Information</StyledButton>
            <StyledButton onClick={this.handleSwitchToTOC}>Return to Table of Contents</StyledButton>
          </ButtonWrapper>
        </BodyWrapper>
      )
    } else if (this.state.step === 'Contact') {
      return (
        <BodyWrapper>
          <div>Address</div>
          <input type='text' name='address' value={this.state.contact.address} onChange={this.handleChange}/>
          <div>City</div>
          <input type='text' name='city' value={this.state.contact.city} onChange={this.handleChange}/>
          <div>State</div>
          <input type='text' name='region' value={this.state.contact.region} onChange={this.handleChange}/>
          <div>Zip</div>
          <input type='text' name='zip' value={this.state.contact.zip} onChange={this.handleChange}/>
          <div>Country</div>
          <input type='text' name='country' value={this.state.contact.country} onChange={this.handleChange}/>
          <div>Phone Number 1</div>
          <input type='text' name='phone1' value={this.state.contact.phone1} onChange={this.handleChange}/>
          <div>Phone Number 2</div>
          <input type='text' name='phone2' value={this.state.contact.phone2} onChange={this.handleChange}/>
          <div>Email 1</div>
          <input type='text' name='email1' value={this.state.contact.email1} onChange={this.handleChange}/>
          <div>Email 2</div>
          <input type='text' name='email2' value={this.state.contact.email2} onChange={this.handleChange}/>
          <ButtonWrapper>
            <StyledButton onClick={this.saveContactInfo}>Save</StyledButton>
            <StyledButton onClick={this.handleSwitchToTOC}>Return to Table of Contents</StyledButton>
          </ButtonWrapper>
        </BodyWrapper>
      )
    }
  }
}

export default ContactInfo;