import React from 'react';
import axios from 'axios';
import { DropDown, Option } from './DropDownMenu.jsx';

class Neighborhood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: '',
      value: '',
      change: false,
      neighborhood: props.neighborhood,
      SwitchToTOC: props.SwitchToTOC,
    }
    this.EditNeighborhood = this.EditNeighborhood.bind(this);
    // this.HandleChange = this.HandleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.SaveNeighborhood = this.SaveNeighborhood.bind(this);
    this.HandleSwitchToTOC = this.HandleSwitchToTOC.bind(this);
  }

  EditNeighborhood () {
    this.setState({ step: 'Neighborhood' });
  }

  // HandleChange(e) {
  //   let editedCamper = this.state.neighborhood;
  //   editedCamper[e.target.name] = e.target.value;
  //   this.setState({neighborhood: editedCamper, change: true});
  // }

  handleSelect(e) {
    let editedCamper = this.state.neighborhood;
    editedCamper = e.target.value;
    this.setState({ neighborhood: editedCamper, change: true });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.value);
  }


  SaveNeighborhood() {
    // The or with this.state.neighborhood may be overkill and may be removed later, but it's there to be safe
    if (!this.state.change || this.state.neighborhood === 'Choose a Neighborhood') {
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
          <div>Neighborhood</div>
          <div>Last updated: A long time ago</div>
          <button onClick={this.EditNeighborhood}>Update Information</button>
          <button onClick={this.HandleSwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    } else if (this.state.step === 'Neighborhood') {
      return (
        <div>
          <DropDown
            onChange={this.handleSelect}
          >
            <Option value="Choose a Neighborhood" />
            <Option value="American Hill" />
            <Option value="Balkan Camp" />
            <Option value="Car Camp" />
            <Option value="Coffee House" />
            <Option value="Cowboy Camp" />
            <Option value="Flamenco Camp" />
            <Option value="The Heights" />
            <Option value="Kitchen" />
            <Option value="Lakeshore" />
            <Option value="Meditation Meadow" />
            <Option value="Rec Row" />
            <Option value="South Pole" />
            <Option value="Upper Touristan" />
            <Option value="Other" />
            <Option value="Don't know yet" />
          </DropDown>
          <button onClick={this.SaveNeighborhood}>Save</button>
          <button onClick={this.HandleSwitchToTOC}>Return to Table of Contents</button>
        </div>
      )
    }
  }
}

export default Neighborhood;

// names of Neighborhoods
// 1	American Hill	2	Balkan Camp	3	Car Camp	4	Coffee House5	Cowboy Camp	6	Flamenco Camp7	The Heights		8	Kitchen		9	Lakeshore	10	Meditation Meadow	11	Rec Row			12	South Pole		13	Upper Touristan	14	Other		15	Don’t know yet