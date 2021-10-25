import React from 'react';
import axios from 'axios';

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: '',
      change: false,
      contact: props.contact,
      SwitchToTOC: props.SwitchToTOC,
    };
    this.EditContactInfo = this.EditContactInfo.bind(this);
    this.HandleChange = this.HandleChange.bind(this);
    this.SaveContactInfo = this.SaveContactInfo.bind(this);
    this.HandleSwitchToTOC = this.HandleSwitchToTOC.bind(this);
  }

  EditContactInfo() {
    this.setState({step: 'Contact'});
  }

  HandleChange(e) {
    let editedCamper = this.state.contact;
    editedCamper[e.target.name] = e.target.value;
    this.setState({contact: editedCamper, change: true});
  }

  SaveContactInfo() {
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

  HandleSwitchToTOC() {
    if (this.state.change) {
      console.log('You have unsaved changes. Are you sure you want to continue?');
    } else {
      this.state.SwitchToTOC();
    }
  }

  render() {
    if (!this.state.step) {
      return (
        <div>
          <div>Contact Information</div>
          <div>Last updated: A long time ago</div>
          <button onClick={this.EditContactInfo}>Update Information</button>
          <button onClick={this.HandleSwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    } else if (this.state.step === 'Contact') {
      return (
        <div>
          <div>Address</div>
          <input type='text' name='address' value={this.state.contact.address} onChange={this.HandleChange}></input>
          <div>City</div>
          <input type='text' name='city' value={this.state.contact.city} onChange={this.HandleChange}></input>
          <div>State</div>
          <input type='text' name='region' value={this.state.contact.region} onChange={this.HandleChange}></input>
          <div>Zip</div>
          <input type='text' name='zip' value={this.state.contact.zip} onChange={this.HandleChange}></input>
          <div>Country</div>
          <input type='text' name='country' value={this.state.contact.country} onChange={this.HandleChange}></input>
          <div>Phone Number 1</div>
          <input type='text' name='phone1' value={this.state.contact.phone1} onChange={this.HandleChange}></input>
          <div>Phone Number 2</div>
          <input type='text' name='phone2' value={this.state.contact.phone2} onChange={this.HandleChange}></input>
          <div>Email 1</div>
          <input type='text' name='email1' value={this.state.contact.email1} onChange={this.HandleChange}></input>
          <div>Email 2</div>
          <input type='text' name='email2' value={this.state.contact.email2} onChange={this.HandleChange}></input>
          <button onClick={this.SaveContactInfo}>Save</button>
          <button onClick={this.HandleSwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    }
  }
}

export default ContactInfo;