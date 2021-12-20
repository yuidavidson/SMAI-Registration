/*
  Components still needed:
  Payment
    Custom Pricing - amount and reason

  TODO: make it so that when you move back to register, currentCamper is reset
        make it so each event is separated so the parties are not the same for all events
*/

import React from 'react';

import CampEvents from './CampEvents.jsx';
import Navigation from './Navigation.jsx';
import Register from './Register.jsx';
import Camper from './Camper.jsx';
import CamperInfoStep from './CamperInfoStep.jsx';
import Neighborhood from './Neighborhood.jsx';
import Sessions from './Sessions.jsx';
import Stripe from './Stripe.jsx';

import CamperModel from '../models/camper';
import api from '../api/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    // dummy data for testing included
    this.state = {
      step: 'events',
      readyForNextStep: false,
      modalState: '',
      camper: '',
      event: '',
      neighborhoodKey: {
        1: 'American Hill',
        2: 'Balkan Camp',
        3: 'Car Camp',
        4: 'Coffee House',
        5: 'Cowboy Camp',
        6: 'Flamenco Camp',
        7: 'The Heights',
        8: 'Kitchen',
        9: 'Lakeshore',
        10: 'Meditation Meadow',
        11: 'Rec Row',
        12: 'South Pole',
        13: 'Upper Touistan',
        14: 'Other',
        15: 'Don\'t know yet',
      },
      partyId: '',
      partyRegId: '',
      party: [], // camper registrations
      currentCamper: null
    };

    this.switchStep = this.switchStep.bind(this);
    this.switchAndClose = this.switchAndClose.bind(this);
    this.switchAndSet = this.switchAndSet.bind(this);

    this.setCurrentCamper = this.setCurrentCamper.bind(this);

    this.updateCamper = this.updateCamper.bind(this);
  }

  componentDidMount() {
    api.run('camper/current')
        .then((response) => {
          const newCamper = new CamperModel(response.data);
          this.setState({camper: newCamper.firstName + ' ' + newCamper.lastName, partyId: newCamper.partyId });
        })
        .catch((error) => {
          console.log(error);
        });
  }

  getCamperFullName() {
    if (!this.state.currentCamper) {
      return 'anonymous';
    }
    return this.state.currentCamper.firstName + ' ' + this.state.currentCamper.lastName;
  }

  updateCamper(step, values) {
    if (!this.state.currentCamper) {
      return;
    }

    this.setState({currentCamper: this.state.currentCamper.updateStepValues(step.id, values, true) } );
  }

  addToParty(partyId, camper) {
    this.setState({party: [camper, ...this.state.party]});
  }
  // function for switching components
  switchStep(step) {
    this.setState({step: step});
  }

  switchAndSet(step, state, value) {
    this.setState({step: step, [state]: value});
  }

  switchAndClose(step) {
    this.setState({step: step});
  }

  setCurrentCamper(camper) {
    api.run('camper/get', {id: camper.id})
    .then((response) => {
      const newCamper = new CamperModel(response.data);
      this.setState({currentCamper: newCamper, step: 'toc'});
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <Navigation
          key={new Date().getTime()}
          camper={this.state.camper}
          event={this.state.event}
          currentCamper={this.getCamperFullName()}
          step={this.state.step}
          switchStep={this.switchStep}
        ></Navigation>
        {this.state.step === 'register' ?
          <Register
            partyId={this.state.partyId}
            camper={this.state.camper}
            party={this.state.party}
            event={this.state.event}
            setCurrentCamper={this.setCurrentCamper}
            addToParty={this.addToParty.bind(this)}
            switchStep={this.switchStep}
          /> : null}
        {this.state.step === 'toc' ?
          <div>
            <div>Registering {this.getCamperFullName()}</div>
            <Camper
              switchStep={this.switchStep}
            />
          </div> : null}
        {this.state.step === 'personal'
          || this.state.step === 'contact'
          || this.state.step === 'vehicle'
          || this.state.step === 'medical'
          || this.state.step === 'emergency' ?
          <div>
            <div>Registering
              {this.getCamperFullName()}
            </div>
            <CamperInfoStep
              key={this.state.step}
              camperId={this.state.currentCamper.id}
              step={this.state.currentCamper.getStepConfig(this.state.step)}
              data={this.state.currentCamper.getStepValues(this.state.step)}
              leaveStep={this.switchStep.bind(this, 'toc')}
              gotoStep={this.switchStep}
              onSavedData={this.updateCamper}
            />
          </div> : null}
        {this.state.step === 'neighborhood' ?
          <div>
          <div>Registering
            {this.getCamperFullName()}
          </div>
          <Neighborhood
            camperId={this.state.currentCamper.id}
            neighborhoodKey={this.state.neighborhoodKey}
            neighborhood={this.state.currentCamper.neighborhood}
            leaveStep={this.switchStep.bind(this, 'toc')}
            gotoStep={this.switchStep}
            onSavedData={this.updateCamper}
          ></Neighborhood>
          </div> : null}
        {this.state.step === 'sessions' ?
          <div>
            <div>Registering {this.getCamperFullName()}</div>
            <Sessions
              sessions={this.state.currentCamper.sessions}
              id={this.state.currentCamper.id}
              switchStep={this.switchStep}
            />
          </div> : null}
          {this.state.step === 'events' ?
          <CampEvents
            switchStep={this.switchStep}
            switchAndSet={this.switchAndSet}
          /> : null}
          {this.state.step === 'stripe' ? <Stripe
            switchStep={this.switchStep}/> : null}
      </div>
    )
  }
};

export default App;