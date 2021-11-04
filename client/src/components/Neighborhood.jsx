import React from 'react';
import axios from 'axios';
import { DropDown, Option } from './DropDownMenu.jsx';
import { BodyWrapper, StyledButton, ButtonWrapper } from './Styles.jsx';

class Neighborhood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: '',
      value: '',
      change: false,
      neighborhood: props.neighborhood,
      neighborhoodName: props.neighborhoodKey[props.neighborhood],
      switchStep: props.switchStep,
    }
    this.editNeighborhood = this.editNeighborhood.bind(this);
    // this.HandleChange = this.HandleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveNeighborhood = this.saveNeighborhood.bind(this);
    this.handleSwitchToTOC = this.handleSwitchToTOC.bind(this);
  }

  editNeighborhood () {
    this.setState({ step: 'Neighborhood' });
  }

  // HandleChange(e) {
  //   let editedCamper = this.state.neighborhood;
  //   editedCamper[e.target.name] = e.target.value;
  //   this.setState({neighborhood: editedCamper, change: true});
  // }

  handleSelect(e) {
    console.log('value: ' + e.target.value);
    console.log('name: ' + e.target.name);
    this.setState({ neighborhood: e.target.value, neighborhoodName: e.target.name, change: true });
  }

  // EDIT: not even using this method, most likely delete later

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.value);
  }


  saveNeighborhood() {

    let dataEncoded = Object.entries(this.state.neighborhood).map(e => encodeURIComponent(e[0])+'='+encodeURIComponent(e[1])).join('&')
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
        <BodyWrapper>
          <div>Neighborhood</div>
          <div>Last updated: A long time ago</div>
          <ButtonWrapper>
            <StyledButton onClick={this.editNeighborhood}>Update Information</StyledButton>
            <StyledButton onClick={this.handleSwitchToTOC}>Return to Table of Contents</StyledButton>
          </ButtonWrapper>
        </BodyWrapper>
      )
    } else if (this.state.step === 'Neighborhood') {
      return (
        <BodyWrapper>
          <DropDown
            onChange={this.handleSelect}
          >
            <Option value='0' name="Choose a Neighborhood" />
            <Option value='1' name="American Hill" />
            <Option value='2' name="Balkan Camp" />
            <Option value='3' name="Car Camp" />
            <Option value='4' name="Coffee House" />
            <Option value='5' name="Cowboy Camp" />
            <Option value='6' name="Flamenco Camp" />
            <Option value='7' name="The Heights" />
            <Option value='8' name="Kitchen" />
            <Option value='9' name="Lakeshore" />
            <Option value='10' name="Meditation Meadow" />
            <Option value='11' name="Rec Row" />
            <Option value='12' name="South Pole" />
            <Option value='13' name="Upper Touristan" />
            <Option value='14' name="Other" />
            <Option value='15' name="Don't know yet" />
          </DropDown>
          <ButtonWrapper>
            <StyledButton onClick={this.saveNeighborhood}>Save</StyledButton>
            <StyledButton onClick={this.handleSwitchToTOC}>Return to Table of Contents</StyledButton>
          </ButtonWrapper>
        </BodyWrapper>
      )
    }
  }
}

export default Neighborhood;

// names of Neighborhoods
// 1	American Hill	2	Balkan Camp	3	Car Camp	4	Coffee House5	Cowboy Camp	6	Flamenco Camp7	The Heights		8	Kitchen		9	Lakeshore	10	Meditation Meadow	11	Rec Row			12	South Pole		13	Upper Touristan	14	Other		15	Don’t know yet