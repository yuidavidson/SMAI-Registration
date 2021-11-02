import React from 'react';
import axios from 'axios';

import { BodyWrapper, StyledButton, ButtonWrapper } from './Styles.jsx';

class Sessions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: '',
      change: false,
      switchStep: props.switchStep,
      crewInvitation: {
        crewInvitationReceived: false,
        crewId: null,
        crewLeader: '',
        crewInvitationAccepted: false,

      },
      session:{
        id: null,
        sessionId: null,
        sessionName: '',
        mealId: null,
        mealName: '',
        foodPreference: '',
        crewId: null,
        crewName: '',
      },
    }
    this.editSessionInfo = this.editSessionInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveSession = this.saveSession.bind(this);
    this.returnToSessions = this.returnToSessions.bind(this);
  }

  editSessionInfo(e) {
    // EDIT: not working as wanted => e.target does not contain the name. There is also a problem with when it is clicked, that the item that is rendered after is also being clicked
    this.setState({ step: e.target.name });
  }

  // EDIT: to hanle not only the meal type but also crew OR create another function for crew selection
  handleChange(e) {
    let editedSession = this.state.session;
    editedSession.mealId = parseInt(e.target.id);
    editedSession.mealName = e.target.name;
    this.setState({ session: editedSession, change: true })
  }

  saveSession() {

    let dataEncoded = Object.entries(this.state.sessions).map(e => encodeURIComponent(e[0])+'='+encodeURIComponent(e[1])).join('&')
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

  returnToSessions() {
    if (this.state.change) {
      console.log('You have unsaved changes. Are you sure you want to continue?');
    } else {
      this.setState({ step: ''});
    }
  }

  render() {
    if (this.state.step === '') {
      return (
        <BodyWrapper>
          {/* EDIT: to add more specific session details and send to state on click */}
          <div><button name='pre-setup' onClick={this.editSessionInfo}>X</button>Pre-setup</div>
          <div><button name='setup' onClick={this.editSessionInfo}>X</button>Setup</div>
          <div><button name='session1' onClick={this.editSessionInfo}>X</button>Session 1</div>
          <div><button name='session2' onClick={this.editSessionInfo}>X</button>Session 2</div>
          <div><button name='session3' onClick={this.editSessionInfo}>X</button>Session 3</div>
          <div><button name='tearDown' onClick={this.editSessionInfo}>X</button>Tear Down</div>
          <ButtonWrapper>
            <StyledButton onClick={() => this.state.switchStep('toc')}>Return To Table Of Contents</StyledButton>
          </ButtonWrapper>
        </BodyWrapper>
      )
    } else {
      return (
        <BodyWrapper>
          <div>Crew</div>
          {/* NOTE: the crew invitation seems still up-in the air and might be a longer term problem to tackle */}
          <div>Kitchen (invited by Trevor)</div>
          <button onClick={this.handleChange}>accept</button>
          <button onClick={this.handleChange}>decline</button>
          <div>Meal</div>
          <div>Kitchen</div>
          {/* EDIT: add name and potentially id (might end up removing id because it might get confusing) to other meal options after more info on backend side is recieved*/}
          <div><button id='1' name='breakfast' onClick={this.handleChange}>X</button>Breakfast ($11)</div>
          <div><button onClick={this.handleChange}>X</button>Dinner ($23)</div>
          <div><button onClick={this.handleChange}>X</button>Breakfast and Dinner ($44)</div>
          <div>Cantina</div>
          <div><button onClick={this.handleChange}>X</button>Lunch ($15)</div>
          <ButtonWrapper>
            <StyledButton onClick={this.saveSession}>Save</StyledButton>
            <StyledButton onClick={this.returnToSessions}>Return to Sessions</StyledButton>
          </ButtonWrapper>
        </BodyWrapper>
      )
    }
  }
}

export default Sessions;