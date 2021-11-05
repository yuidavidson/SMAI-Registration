/*
  Components still needed:
  Payment
    Custom Pricing - amount and reason

  EDIT: make it so that when you move back t o register, currentCamper is reset
*/

import React from 'react';
import axios from 'axios';

import Navigation from './Navigation.jsx';
import Register from './Register.jsx';
import Camper from './Camper.jsx';
import CamperInfoStep from './CamperInfoStep.jsx';
import Neighborhood from './Neighborhood.jsx';
import Sessions from './Sessions.jsx';

import CamperModel from '../models/camper';

class App extends React.Component {
  constructor(props) {
    super(props);
    // dummy data for testing included
    this.state = {
      step: 'register',
      stepKey: {
        register: 'Camper Selection',
        toc: 'Table of Contents',
        personal: 'Personal Information',
        contact: 'Contact Information',
        vehicle: 'Vehicle Information',
        emergency: 'Emergency Contact',
        medical: 'Medical Information',
        neighborhood: 'Neighborhood',
        sessions: 'Sessions',
      },
      readyForNextStep: false,
      modalState: '',
      account: 'SMF034',
      camper: 'Joshua Freeman',
      event: 'Mill 2022',
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
      // The party structure might have to be changed depending on what the data coming in looks like

      // party : [
      //   'Joshua Freeman',
      //   'Karen Freeman',
      //   'David Konno',
      //   'Shelli Smart',
      //   'Cedar Dobson',
      // ],
      party: [
        {
          camper: 'Joshua Freeman',
          camperId: 1,
        },
        {
          camper: 'Karen Freeman',
          camperId: 2,
        },
        {
          camper: 'David Konno',
          camperId: 3,
        },
        {
          camper: 'Shelli Smart',
          camperId: 4,
        },
        {
          camper: 'Cedar Dobson',
          camperId: 5,
        },
      ],
      currentCamper: null,
      // Assumed that the title of each session and it's date will eventually be separate -> probably have to change to an object. Currently not in use
      // sessions: [
      //   'Pre-pre camp - July 5',
      //   'Set Up - July 8',
      //   'Session 1 - July 12',
      //   'Session 2 - July 15',
      //   'Session 3 - July 18',
      //   'Tear Down - July 21',
      // ],
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.switchStep = this.switchStep.bind(this);
    this.switchAndClose = this.switchAndClose.bind(this);

    this.setCurrentCamper = this.setCurrentCamper.bind(this);

    this.updateCamper = this.updateCamper.bind(this);
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
  // EDIT: when back-end is ready, should call for the party members of the user
  // componentDidMount() {
  //   axios.get('https://smai.us/api/camper/get?id=2')
  //   .then((response) => {
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // }

  openModal(modalType) {
    this.setState({modalState: modalType})
  }

  closeModal() {
    this.setState({ modalState: ''});
  }

  // function for switching components
  switchStep(step) {
    this.setState({step: step});
  }

  switchAndClose(step) {
    this.setState({modalState: '', step: step});
  }

  //  old setCurrentCamper
  // setCurrentCamper(partyMember) {
  //   let newData = this.state.currentCamper;
  //   newData.camper = partyMember.camper;
  //   this.setState({currentCamper: newData});
  //   this.setState({step: 'toc'});
  // }

  setCurrentCamper(camperId) {
    axios.get(`https://smai.us/api/camper/get?id=${camperId}`)
    .then((response) => {
      let data = response.data.data.values;
      const newData = new CamperModel(data);
      this.setState({currentCamper: newData, step: 'toc'});
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <Navigation
          camper={this.state.camper}
          event={this.state.event}
          currentCamper={this.getCamperFullName()}
          step={this.state.step}
          stepKey={this.state.stepKey}
        ></Navigation>
        {this.state.step === 'register' ?
          <Register
            account={this.state.account}
            camper={this.state.camper}
            party={this.state.party}
            modalState={this.state.modalState}
            setCurrentCamper={this.setCurrentCamper}
            openModal={this.openModal}
            closeModal={this.closeModal}
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
              camperId={this.state.currentCamper.camperId}
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
            camperId={this.state.currentCamper.camperId}
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
              camperId={this.state.currentCamper.camperId}
              switchStep={this.switchStep}
            />
          </div> : null}
      </div>
    )
  }
};

export default App;