import React from 'react';
import axios from 'axios';

class MedicalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: '',
      change: false,
      medicalInformation: props.medicalInformation,
      switchStep: props.switchStep,
    };
    this.editMedicalInfo = this.editMedicalInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveMedicalInfo = this.saveMedicalInfo.bind(this);
    this.handleSwitchToTOC = this.handleSwitchToTOC.bind(this);
  }

  editMedicalInfo () {
    this.setState({step: 'MedicalInfo'});
  }

  handleChange(e) {
    let editedCamper = this.state.medicalInformation;
    editedCamper[e.target.name] = e.target.value;
    this.setState({medicalInfoformation: editedCamper, change: true});
  }

  saveMedicalInfo() {
    if (!this.state.change) {
      console.log('no changes detect to be saved!');
    } else {
      axios({
        method: 'POST',
        url: 'https://smai.us/api/save-value',
        params: {
          // probably using this.state.medicalInfo
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

  handleSwitchToTOC() {
    if (this.state.change) {
      console.log('You have unsaved changes. Are you sure you want to continue?');
    } else {
      this.state.switchStep('toc');
    }
  }

  render() {
    if(!this.state.step) {
      return (
        <div>
          <div>Emergency Information</div>
          <div>Last updated 3.16.18</div>
          <button onClick={this.editMedicalInfo}>Update Information</button>
          <button onClick={this.handleSwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    } else if (this.state.step === 'MedicalInfo') {
      return (
        <div>
          <div>Medical Conditions</div>
          <input type='text' name='medicalCondition' value={this.state.medicalInformation.medicalCondition} onChange={this.handleChange}/>
          <div>Allergies</div>
          <input type='text' name='allergy' value={this.state.medicalInformation.allergy} onChange={this.handleChange}/>
          <div>Asthma</div>
          <div>Plan</div>
          <input type='text' name='plan' value={this.state.medicalInformation.plan} onChange={this.handleChange}/>
          <div>Doctor</div>
          <input type='text' name='doctor' value={this.state.medicalInformation.doctor} onChange={this.handleChange}/>
          <div>Hospital</div>
          <input type='text' name='hospital' value={this.state.medicalInformation.hospital} onChange={this.handleChange}/>
          <div>Special Needs</div>
          <input type='text' name='specialNeeds' value={this.state.medicalInformation.specialNeeds} onChange={this.handleChange}/>
          <button onClick={this.saveMedicalInfo}>Save</button>
          <button onClick={this.handleSwitchToTOC}>Return to Table of Contents</button>
        </div>

      )
    }
  }
}

export default MedicalInfo;