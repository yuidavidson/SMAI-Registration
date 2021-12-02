/*
  Register component test
*/

import React from 'react';

import Register from './../Register.jsx';
import CamperModel from '../../models/camper';
import sampleCamper from '../../models/tests/camper.json.js';
import sampleRegistration from '../../models/tests/registration.json.js';

class RegisterTest extends React.Component {
  constructor(props) {
    super(props);
    // dummy data for testing included
    this.state = {
      camper: 'Joshua Freeman',
      event: 'Mill 2022',
      partyId: '',
      partyRegId: '',
      party: [], // camper registrations
      currentCamper: null
    };

    this.setCurrentCamper = this.setCurrentCamper.bind(this);

  }

  componentDidMount() {
    const newCamper = new CamperModel(sampleCamper);
    this.setState({camper: newCamper.firstName + ' ' + newCamper.lastName, partyId: newCamper.partyId });
  }

  addToParty(partyId, camper) {
    this.setState({party: [camper, ...this.state.party]});
  }

  setCurrentCamper(camper) {
    const newCamper = new CamperModel(sampleCamper);
    this.setState({currentCamper: newCamper, step: 'toc'});
  }

  render() {
    return (
      <Register
        partyId={this.state.partyId}
        camper={this.state.camper}
        party={this.state.party}
        event={this.state.event}
        setCurrentCamper={this.setCurrentCamper}
        addToParty={this.addToParty.bind(this)}
        switchStep={this.switchStep}
      />
    )
  }
}

export default RegisterTest;