import React from 'react';

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: '',
      currentCamper: props.currentCamper
    };
    this.editPersonalInfo = this.editPersonalInfo.bind(this);
    this.editContactInfo = this.editContactInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  editPersonalInfo() {
    this.setState({step: 'Personal'});
  }

  editContactInfo() {
    this.setState({step: 'Contact'});
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
          <button onClick={this.editContactInfo}>Next</button>
        </div>
      )
    } else if (this.state.step === 'Contact') {
      return(
        <div>
          <div>Address</div>
          <input type='text' name='address' value={this.state.currentCamper.personal.address} onChange={this.handleChange}></input>
          <div>City</div>
          <input type='text' name='city' value={this.state.currentCamper.personal.city} onChange={this.handleChange}></input>
          <div>State</div>
          <input type='text' name='region' value={this.state.currentCamper.personal.region} onChange={this.handleChange}></input>
          <div>Zip</div>
          <input type='text' name='zip' value={this.state.currentCamper.personal.zip} onChange={this.handleChange}></input>
          <div>Country</div>
          <input type='text' name='country' value={this.state.currentCamper.personal.country} onChange={this.handleChange}></input>
          <div>Phone Number 1</div>
          <input type='text' name='phone1' value={this.state.currentCamper.personal.phone1} onChange={this.handleChange}></input>
          <div>Phone Number 2</div>
          <input type='text' name='phone2' value={this.state.currentCamper.personal.phone2} onChange={this.handleChange}></input>
          <div>Email 1</div>
          <input type='text' name='email1' value={this.state.currentCamper.personal.email1} onChange={this.handleChange}></input>
          <div>Email 2</div>
          <input type='text' name='email2' value={this.state.currentCamper.personal.email2} onChange={this.handleChange}></input>
          <button onClick={this.editPersonalInfo}>Previous</button>
          <button>Save</button>
        </div>
      )
    }
  }
}

export default PersonalInfo;