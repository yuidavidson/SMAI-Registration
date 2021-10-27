import React from 'react';
import axios from 'axios';

class Vehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: '',
      change: false,
      vehicle: props.vehicle,
      switchStep: props.switchStep,
    };
    this.editVehicleInfo = this.editVehicleInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveVehicleInfo = this.saveVehicleInfo.bind(this);
    this.handleSwitchToTOC = this.handleSwitchToTOC.bind(this);
  }

  editVehicleInfo () {
    this.setState({step: 'Vehicle'});
  }

  handleChange(e) {
    let editedCamper = this.state.vehicle;
    editedCamper[e.target.name] = e.target.value;
    this.setState({vehicle: editedCamper, change: true});
  }

  saveVehicleInfo() {
    if (!this.state.change) {
      console.log('no changes detect to be saved!');
    } else {
      axios({
        method: 'POST',
        url: 'https://smai.us/api/save-value',
        params: {
          // probably using this.state.vehcile
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

  render () {
    if (!this.state.step) {
      return (
        <div>
          <div>Vehicle Information</div>
          <div>Last updated: A long time ago</div>
          <button onClick={this.editVehicleInfo}>Update Information</button>
          <button onClick={this.handleSwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    } else if (this.state.step === 'Vehicle') {
      return (
        <div>
          <div>Vehicle 1 Model</div>
          <input type='text' name='vehicle1Model' value={this.state.vehicle.vehicle1Model} onChange={this.handleChange}/>
          <div>Vehicle 1 Plate</div>
          <input type='text' name='vehicle1Plate' value={this.state.vehicle.vehicle1Plate} onChange={this.handleChange}/>
          <div>Vehicle 1 State</div>
          <input type='text' name='vehicle1State' value={this.state.vehicle.vehicle1State} onChange={this.handleChange}/>
          <div>Vehicle 2 Model</div>
          <input type='text' name='vehicle2Model' value={this.state.vehicle.vehicle2Model} onChange={this.handleChange}/>
          <div>Vehicle 2 Plate</div>
          <input type='text' name='vehicle2Plate' value={this.state.vehicle.vehicle2Plate} onChange={this.handleChange}/>
          <div>Vehicle 2 State</div>
          <input type='text' name='vehicle2State' value={this.state.vehicle.vehicle2State} onChange={this.handleChange}/>
          <button onClick={this.saveVehicleInfo}>Save</button>
          <button onClick={this.handleSwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    }
  }
}

export default Vehicle;