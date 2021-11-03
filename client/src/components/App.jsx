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
import TableOfContents from './TableOfContents.jsx';
import CamperInfoStep from './CamperInfoStep.jsx';
import ContactInfo from './ContactInfo.jsx';
import Vehicle from './Vehicle.jsx';
import EmergencyContact from './EmergencyContact.jsx';
import MedicalInfo from './MedicalInfo.jsx';
import Neighborhood from './Neighborhood.jsx';
import Sessions from './Sessions.jsx';
import { BodyWrapper, StyledButton } from './Styles.jsx';

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
    if (this.state.step === 'register') {
      return (
        <div>
          <Navigation
            camper={this.state.camper}
            event={this.state.event}
            currentCamper={this.getCamperFullName()}
            step={this.state.step}
            stepKey={this.state.stepKey}
          ></Navigation>
          <Register
            account={this.state.account}
            camper={this.state.camper}
            party={this.state.party}
            modalState={this.state.modalState}
            setCurrentCamper={this.setCurrentCamper}
            openModal={this.openModal}
            closeModal={this.closeModal}
          />
        </div>
      )
    } else if (this.state.step === 'toc') {
      return (
        <div>
          <Navigation
            camper={this.state.camper}
            event={this.state.event}
            currentCamper={this.getCamperFullName()}
            step={this.state.step}
            switchStep={this.switchStep}
            stepKey={this.state.stepKey}
          ></Navigation>
          <div>Registering {this.getCamperFullName()}</div>
          <TableOfContents
            switchStep={this.switchStep}
          />
          {/* <StyledButton
            onClick={() => this.switchStep('register')}>Back to All</StyledButton> */}
        </div>
      )
    } else if (this.state.step === 'personal') {
      return (
        <div>
          <Navigation
            camper={this.state.camper}
            event={this.state.event}
            currentCamper={this.getCamperFullName()}
            step={this.state.step}
            switchStep={this.switchStep}
            stepKey={this.state.stepKey}
          ></Navigation>
          <div>Registering
            {this.getCamperFullName()}
          </div>
          <CamperInfoStep
              camperId={this.state.currentCamper.camperId}
              step={this.state.currentCamper.getStepConfig('personal')}
              data={this.state.currentCamper.getStepValues('personal')}
              leaveStep={this.switchStep.bind(this, 'toc')}
              gotoStep={this.switchStep}
              onSavedData={this.updateCamper}
          />
        </div>
      )
    } else if (this.state.step === 'contact') {
      return (
        <div>
          <Navigation
            camper={this.state.camper}
            event={this.state.event}
            currentCamper={this.getCamperFullName()}
            step={this.state.step}
            switchStep={this.switchStep}
            stepKey={this.state.stepKey}
          ></Navigation>
          <div>Registering {this.getCamperFullName()}</div>
          <ContactInfo
            contact={this.state.currentCamper.contact}
            camperId={this.state.currentCamper.camperId}
            switchStep={this.switchStep}
          />
        </div>
      )
    } else if (this.state.step === 'vehicle') {
      return (
        <div>
          <Navigation
            camper={this.state.camper}
            event={this.state.event}
            currentCamper={this.getCamperFullName()}
            step={this.state.step}
            switchStep={this.switchStep}
            stepKey={this.state.stepKey}
          ></Navigation>
          <div>Registering {this.getCamperFullName()}</div>
          <Vehicle
            vehicle={this.state.currentCamper.vehicle}
            camperId={this.state.currentCamper.camperId}
            switchStep={this.switchStep}
          />
        </div>
      )
    }
    else if (this.state.step === 'emergency') {
      return (
        <div>
          <Navigation
            camper={this.state.camper}
            event={this.state.event}
            currentCamper={this.getCamperFullName()}
            step={this.state.step}
            switchStep={this.switchStep}
            stepKey={this.state.stepKey}
          ></Navigation>
          <div>Registering {this.getCamperFullName()}</div>
          <EmergencyContact
            emergencyContact={this.state.currentCamper.emergencyContact}
            camperId={this.state.currentCamper.camperId}
            switchStep={this.switchStep}
          />
        </div>
      )
    } else if (this.state.step === 'medical') {
      return (
        <div>
          <Navigation
            camper={this.state.camper}
            event={this.state.event}
            currentCamper={this.getCamperFullName()}
            step={this.state.step}
            switchStep={this.switchStep}
            stepKey={this.state.stepKey}
          ></Navigation>
          <div>Registering {this.getCamperFullName()}</div>
          <MedicalInfo
            medicalInformation={this.state.currentCamper.medicalInformation}
            camperId={this.state.currentCamper.camperId}
            switchStep={this.switchStep}
          />
        </div>
      )
    } else if (this.state.step === 'neighborhood') {
      return (
        <div>
          <Navigation
            camper={this.state.camper}
            event={this.state.event}
            currentCamper={this.getCamperFullName()}
            step={this.state.step}
            switchStep={this.switchStep}
            stepKey={this.state.stepKey}
          ></Navigation>
          <div>Registering {this.getCamperFullName()}</div>
          <Neighborhood
            neighborhood={this.state.currentCamper.neighborhood}
            camperId={this.state.currentCamper.camperId}
            neighborhoodKey={this.state.neighborhoodKey}
            switchStep={this.switchStep}
          />
        </div>
      )
    } else if (this.state.step === 'sessions') {
      return (
        <div>
          <Navigation
            camper={this.state.camper}
            event={this.state.event}
            currentCamper={this.getCamperFullName()}
            step={this.state.step}
            switchStep={this.switchStep}
            stepKey={this.state.stepKey}
          ></Navigation>
          <div>Registering {this.getCamperFullName()}</div>
          <Sessions
            sessions={this.state.currentCamper.sessions}
            camperId={this.state.currentCamper.camperId}
            switchStep={this.switchStep}
          />
        </div>
      )
    }
  }
};

export default App;