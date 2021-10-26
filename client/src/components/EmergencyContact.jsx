import React from 'react';
import axios from 'axios';

class EmergencyContact extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        step: '',
        change: false,
        emergencyContact: props.emergencyContact,
        switchStep: props.switchStep,
      };
    this.EditEmergencyContact = this.EditEmergencyContact.bind(this);
    this.HandleChange = this.HandleChange.bind(this);
    this.SaveEmergencyContact = this.SaveEmergencyContact.bind(this);
    this.HandleSwitchToTOC = this.HandleSwitchToTOC.bind(this);
  }

  EditEmergencyContact () {
    this.setState({step: 'emergencyContact'});
    }

  HandleChange(e) {
    let editedCamper = this.state.emergencyContact;
    editedCamper[e.target.name] = e.target.value;
    this.setState({emergencyContact: editedCamper, change: true});
    }

  SaveEmergencyContact() {
    if (!this.state.change) {
      console.log('no changes detect to be saved!');
    } else {
      axios({
        method: 'POST',
        url: 'https://smai.us/api/save-value',
        params: {
          // probably using this.state.emergencyContact
        },
      })
      .then((response) => {
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

  HandleSwitchToTOC() {
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
          <button onClick={this.EditEmergencyContact}>Update Information</button>
          <button onClick={this.HandleSwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    } else if (this.state.step === 'emergencyContact') {
      return (
        <div>
          <div>Contact 1 First Name</div>
          <input type='text' name='contact1FirstName' value={this.state.emergencyContact.contact1FirstName} onChange={this.HandleChange}></input>
          <div>Contact 1 Last Name</div>
          <input type='text' name='contact1LastName' value={this.state.emergencyContact.contact1LastName} onChange={this.HandleChange}></input>
          <div>Contact 1 Relationship</div>
          <input type='text' name='contact1Relationship' value={this.state.emergencyContact.contact1Relationship} onChange={this.HandleChange}></input>
          <div>Contact 1 Phone Number</div>
          <input type='text' name='contact1Phone' value={this.state.emergencyContact.contact1Phone} onChange={this.HandleChange}></input>
          <div>Contact 1 Location</div>
          <input type='text' name='contact1Location' value={this.state.emergencyContact.contact1Location} onChange={this.HandleChange}></input>
          <div>Contact 2 First Name</div>
          <input type='text' name='contact2FirstName' value={this.state.emergencyContact.contact2FirstName} onChange={this.HandleChange}></input>
          <div>Contact 2 Last Name</div>
          <input type='text' name='contact2LastName' value={this.state.emergencyContact.contact2LastName} onChange={this.HandleChange}></input>
          <div>Contact 2 Relationship</div>
          <input type='text' name='contact2Relationship' value={this.state.emergencyContact.contact2Relationship} onChange={this.HandleChange}></input>
          <div>Contact 2 Phone Number</div>
          <input type='text' name='contact2Phone' value={this.state.emergencyContact.contact2Phone} onChange={this.HandleChange}></input>
          <div>Contact 2 Location</div>
          <input type='text' name='contact2Location' value={this.state.emergencyContact.contact2Location} onChange={this.HandleChange}></input>
          <button onClick={this.SaveEmergencyContact}>Save</button>
          <button onClick={this.HandleSwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    }
  }
}

export default EmergencyContact;