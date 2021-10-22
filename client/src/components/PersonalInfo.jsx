import React from 'react';

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: '',
      currentCamper: props.currentCamper
    };
    this.editPersonalInfo = this.editPersonalInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  editPersonalInfo() {
    this.setState({step: 'Personal'});
  }

  handleChange(e) {
    let editedCamper = this.state.currentCamper;
    editedCamper.personal[e.target.name] = e.target.value;
    this.setState({currentCamper: editedCamper});
  }

  render() {
    if (!this.state.step) {
      return (
        <div>
          <div>Personal Information</div>
          <div>Last updated: A long time ago</div>
          <button onClick={this.editPersonalInfo}>Update Information</button>
        </div>
      )
    } else if (this.state.step === 'Personal') {
      return (
        <div>
          <div>First Name</div>
          <input type='text' name='firstName' value={this.state.currentCamper.personal.firstName} onChange={this.handleChange}></input>
          <div>Last Name</div>
          <input type='text' name='lastName' value={this.state.currentCamper.personal.lastName} onChange={this.handleChange}></input>
          <div>Birthday</div>
          <input type='text' name='bday'value={this.state.currentCamper.personal.bday} onChange={this.handleChange}></input>
          <div>Food Preference</div>
          <input type='text' name='foodPreference' value={this.state.currentCamper.personal.foodPreference} onChange={this.handleChange}></input>
          <div>Neighborhood</div>
          <input type='text' name='neighborhood' value={this.state.currentCamper.personal.neighborhood} onChange={this.handleChange}></input>
          <button>Save</button>
        </div>
      )
    }
  }
}

export default PersonalInfo;