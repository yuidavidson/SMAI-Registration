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
    this.EditMedicalInfo = this.EditMedicalInfo.bind(this);
    this.HandleChange = this.HandleChange.bind(this);
    this.SaveMedicalInfo = this.SaveMedicalInfo.bind(this);
    this.HandleSwitchToTOC = this.HandleSwitchToTOC.bind(this);
  }

  EditMedicalInfo () {
    this.setState({step: 'MedicalInfo'});
  }

  HandleChange(e) {
    let editedCamper = this.state.medicalInformation;
    editedCamper[e.target.name] = e.target.value;
    this.setState({medicalInfoformation: editedCamper, change: true});
  }

  SaveMedicalInfo() {
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

  HandleSwitchToTOC() {
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
          <button onClick={this.EditMedicalInfo}>Update Information</button>
          <button onClick={this.HandleSwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    } else if (this.state.step === 'MedicalInfo') {
      return (
        <div>
          <div>Medical Conditions</div>
          <input type='text' name='medicalCondition' value={this.state.medicalInformation.medicalCondition} onChange={this.HandleChange}></input>
          <div>Allergies</div>
          <input type='text' name='allergy' value={this.state.medicalInformation.allergy} onChange={this.HandleChange}></input>
          <div>Asthma</div>
          <div>Plan</div>
          <input type='text' name='plan' value={this.state.medicalInformation.plan} onChange={this.HandleChange}></input>
          <div>Doctor</div>
          <input type='text' name='doctor' value={this.state.medicalInformation.doctor} onChange={this.HandleChange}></input>
          <div>Hospital</div>
          <input type='text' name='hospital' value={this.state.medicalInformation.hospital} onChange={this.HandleChange}></input>
          <div>Special Needs</div>
          <input type='text' name='specialNeeds' value={this.state.medicalInformation.specialNeeds} onChange={this.HandleChange}></input>
          <button onClick={this.SaveMedicalInfo}>Save</button>
          <button onClick={this.HandleSwitchToTOC}>Return to Table of Contents</button>
        </div>

      )
    }
  }
}

export default MedicalInfo;