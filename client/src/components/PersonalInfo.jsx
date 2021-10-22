import React from 'react';

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: '',
      change: false,
      currentCamper: props.currentCamper
    };
    this.EditPersonalInfo = this.EditPersonalInfo.bind(this);
    this.HandleChange = this.HandleChange.bind(this);
  }

  EditPersonalInfo() {
    this.setState({step: 'Personal'});
  }

  HandleChange(e) {
    let editedCamper = this.state.currentCamper;
    editedCamper.personal[e.target.name] = e.target.value;
    this.setState({currentCamper: editedCamper});
    this.setState({change: true});
  }



  render() {
    if (!this.state.step) {
      return (
        <div>
          <div>Personal Information</div>
          <div>Last updated: A long time ago</div>
          <button onClick={this.EditPersonalInfo}>Update Information</button>
        </div>
      )
    } else if (this.state.step === 'Personal') {
      return (
        <div>
          <div>First Name</div>
          <input type='text' name='firstName' value={this.state.currentCamper.personal.firstName} onChange={this.HandleChange}></input>
          <div>Last Name</div>
          <input type='text' name='lastName' value={this.state.currentCamper.personal.lastName} onChange={this.HandleChange}></input>
          <div>Birthday</div>
          <input type='text' name='bday'value={this.state.currentCamper.personal.bday} onChange={this.HandleChange}></input>
          <div>Food Preference</div>
          <input type='text' name='foodPreference' value={this.state.currentCamper.personal.foodPreference} onChange={this.HandleChange}></input>
          <div>Neighborhood</div>
          <input type='text' name='neighborhood' value={this.state.currentCamper.personal.neighborhood} onChange={this.HandleChange}></input>
          <button>Save</button>
        </div>
      )
    }
  }
}

export default PersonalInfo;