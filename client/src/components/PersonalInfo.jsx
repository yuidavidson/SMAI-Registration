import React from 'react';
import axios from 'axios';

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: '',
      change: false,
      personal: props.personal,
      SwitchToTOC: props.SwitchToTOC,
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
          <div>Personal Information</div>
          <div>Last updated: A long time ago</div>
          <button onClick={this.EditPersonalInfo}>Update Information</button>
          <button onClick={this.HandleSwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    } else if (this.state.step === 'Personal') {
      return (
        <div>
          <div>First Name</div>
          <input type='text' name='firstName' value={this.state.personal.firstName} onChange={this.HandleChange}></input>
          <div>Last Name</div>
          <input type='text' name='lastName' value={this.state.personal.lastName} onChange={this.HandleChange}></input>
          <div>Birthday</div>
          <input type='text' name='bday'value={this.state.personal.bday} onChange={this.HandleChange}></input>
          <div>Food Preference</div>
          <input type='text' name='foodPreference' value={this.state.personal.foodPreference} onChange={this.HandleChange}></input>
          <div>Neighborhood</div>
          <input type='text' name='neighborhood' value={this.state.personal.neighborhood} onChange={this.HandleChange}></input>
          <button onClick={this.SavePersonalInfo}>Save</button>
          <button onClick={this.HandleSwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    }
  }
}

export default PersonalInfo;