/*
  EDIT: need to add lastUpdated
*/

import React from 'react';
import axios from 'axios';

import BoolSwitch from './BoolSwitch.jsx';
import { BodyWrapper, StyledButton, ButtonWrapper } from './Styles.jsx';

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
    this.onUpdate = this.onUpdate.bind(this);
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

    let dataEncoded = Object.entries(this.state.medicalInformation).map(e => encodeURIComponent(e[0])+'='+encodeURIComponent(e[1])).join('&')
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
        console.log(response);
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

  // used for boolSwitch for medicalHasAsthma
  // EDIT: to be changed to also work for allergies
  onUpdate(value) {
    let newData = this.state.medicalInformation;
    newData.medicalHasAsthma = value;
    this.setState({medicalInformation: newData, change: true});
  }

  render() {
    if(!this.state.step) {
      return (
        <BodyWrapper>
          <div>Emergency Information</div>
          <div>Last updated 3.16.18</div>
          <ButtonWrapper>
            <StyledButton onClick={this.editMedicalInfo}>Update Information</StyledButton>
            <StyledButton onClick={this.handleSwitchToTOC}>Return to Table of Contents</StyledButton>
          </ButtonWrapper>
        </BodyWrapper>
      )
    } else if (this.state.step === 'MedicalInfo') {
      return (
        <BodyWrapper>
          <div>Medical Conditions</div>
          <input type='text' name='medicalCondition' value={this.state.medicalInformation.medicalCondition} onChange={this.handleChange}/>
          {/* EDIT: to be changed to be a bool switch */}
          <div>Allergies</div>
          <input type='text' name='medicalHasAllergy' value={this.state.medicalInformation.medicalHasAllergy} onChange={this.handleChange}/>
          <div>Asthma</div>
          <BoolSwitch isOn={this.state.medicalInformation.medicalHasAsthma} onUpdate={this.onUpdate}></BoolSwitch>
          <div>Plan</div>
          <input type='text' name='medicalPlan' value={this.state.medicalInformation.medicalPlan} onChange={this.handleChange}/>
          <div>Doctor</div>
          <input type='text' name='medicalDoctor' value={this.state.medicalInformation.medicalDoctor} onChange={this.handleChange}/>
          <div>Hospital</div>
          <input type='text' name='medicalHospital' value={this.state.medicalInformation.medicalHospital} onChange={this.handleChange}/>
          <div>Special Needs</div>
          <input type='text' name='medicalSpecialNeeds' value={this.state.medicalInformation.medicalSpecialNeeds} onChange={this.handleChange}/>
          <ButtonWrapper>
            <StyledButton onClick={this.saveMedicalInfo}>Save</StyledButton>
            <StyledButton onClick={this.handleSwitchToTOC}>Return to Table of Contents</StyledButton>
          </ButtonWrapper>
        </BodyWrapper>

      )
    }
  }
}

export default MedicalInfo;