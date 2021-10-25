import React from 'react';
import axios from 'axios';

class Vehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: '',
      change: false,
      vehicle: props.vehicle,
      SwitchToTOC: props.SwitchToTOC,
    };
    this.EditVehicleInfo = this.EditVehicleInfo.bind(this);
    this.HandleChange = this.HandleChange.bind(this);
    this.SaveVehicleInfo = this.SaveVehicleInfo.bind(this);
    this.HandleSwitchToTOC = this.HandleSwitchToTOC.bind(this);
  }

  EditVehicleInfo () {
    this.setState({step: 'Vehicle'});
  }

  HandleChange(e) {
    let editedCamper = this.state.vehicle;
    editedCamper[e.target.name] = e.target.value;
    this.setState({vehicle: editedCamper, change: true});
  }

  SaveVehicleInfo() {
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

  HandleSwitchToTOC() {
    if (this.state.change) {
      console.log('You have unsaved changes. Are you sure you want to continue?');
    } else {
      this.state.SwitchToTOC();
    }
  }

  render () {
    if (!this.state.step) {
      return (
        <div>
          <div>Vehicle Information</div>
          <div>Last updated: A long time ago</div>
          <button onClick={this.EditVehicleInfo}>Update Information</button>
          <button onClick={this.HandleSwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    } else if (this.state.step === 'Vehicle') {
      return (
        <div>
          <div>Vehicle 1 Model</div>
          <input type='text' name='vehicle1Model' value={this.state.vehicle.vehicle1Model} onChange={this.HandleChange}></input>
          <div>Vehicle 1 Plate</div>
          <input type='text' name='vehicle1Plate' value={this.state.vehicle.vehicle1Plate} onChange={this.HandleChange}></input>
          <div>Vehicle 1 State</div>
          <input type='text' name='vehicle1State' value={this.state.vehicle.vehicle1State} onChange={this.HandleChange}></input>
          <div>Vehicle 2 Model</div>
          <input type='text' name='vehicle2Model' value={this.state.vehicle.vehicle2Model} onChange={this.HandleChange}></input>
          <div>Vehicle 2 Plate</div>
          <input type='text' name='vehicle2Plate' value={this.state.vehicle.vehicle2Plate} onChange={this.HandleChange}></input>
          <div>Vehicle 2 State</div>
          <input type='text' name='vehicle2State' value={this.state.vehicle.vehicle2State} onChange={this.HandleChange}></input>
          <button onClick={this.SaveVehicleInfo}>Save</button>
          <button onClick={this.HandleSwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    }
  }
}

export default Vehicle;