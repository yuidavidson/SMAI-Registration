import React from 'react';
import axios from 'axios';

// eventually make it so the sessions aren't hard coded
// const Sessions = (props) => {
//   const sessions = props.sessions;
//   const sessionList = sessions.map((session) =>
//     <div key={session.toString()}>
//       <button onClick={() => props.SelectSessions(session)}>x</button>
//       {session}
//     </div>
//   );
//   return (
//     <div>{sessionList}</div>
//   )
// };

class Sessions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'sessions',
      change: false,
      SwitchToTOC: props.SwitchToTOC,
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
    this.EditSessionInfo = this.EditSessionInfo.bind(this);
    this.HandleChange = this.HandleChange.bind(this);
    this.SaveSession = this.SaveSession.bind(this);
    this.ReturnToSessions = this.ReturnToSessions.bind(this);
  }

  EditSessionInfo(e) {
    // EDIT: not working as wanted => e.target does not contain the name. There is also a problem with when it is clicked, that the item that is rendered after is also being clicked
    this.setState({ step: e.target.name });
  }

  // EDIT: to hanle not only the meal type but also crew OR create another function for crew selection
  HandleChange(e) {
    let editedSession = this.state.session;
    editedSession.mealId = parseInt(e.target.id);
    editedSession.mealName = e.target.name;
    this.setState({ session: editedSession, change: true })
  }

  SaveSession() {
    if (!this.state.change) {
      console.log('no changes detected to be saved!');
    } else {
      axios({
        method: 'POST',
        url: 'https://smai.us/api/save-value',
        params: {
          // probably using this.state.session and/or crewInvitation
        },
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

  ReturnToSessions() {
    if (this.state.change) {
      console.log('You have unsaved changes. Are you sure you want to continue?');
    } else {
      this.setState({ step: 'sessions'});
    }
  }

  render() {
    if (this.state.step === 'sessions') {
      return (
        <div>
          {/* EDIT: to add more specific session details and send to state on click */}
          <div><button name='pre-setup' onClick={this.EditSessionInfo}>X</button>Pre-setup</div>
          <div><button name='setup' onClick={this.EditSessionInfo}>X</button>Setup</div>
          <div><button name='session1' onClick={this.EditSessionInfo}>X</button>Session 1</div>
          <div><button name='session2' onClick={this.EditSessionInfo}>X</button>Session 2</div>
          <div><button name='session3' onClick={this.EditSessionInfo}>X</button>Session 3</div>
          <div><button name='tearDown' onClick={this.EditSessionInfo}>X</button>Tear Down</div>
          <button onClick={this.state.SwitchToTOC}>Return To Table Of Contents</button>
        </div>
      )
    } else {
      return (
        <div>
          <div>Crew</div>
          {/* NOTE: the crew invitation seems still up-in the air and might be a longer term problem to tackle */}
          <div>Kitchen (invited by Trevor)</div>
          <button onClick={this.HandleChange}>accept</button>
          <button onClick={this.HandleChange}>decline</button>
          <div>Meal</div>
          <div>Kitchen</div>
          {/* EDIT: add name and potentially id (might end up removing id because it might get confusing) to other meal options after more info on backend side is recieved*/}
          <div><button id='1' name='breakfast' onClick={this.HandleChange}>X</button>Breakfast ($11)</div>
          <div><button onClick={this.HandleChange}>X</button>Dinner ($23)</div>
          <div><button onClick={this.HandleChange}>X</button>Breakfast and Dinner ($44)</div>
          <div>Cantina</div>
          <div><button onClick={this.HandleChange}>X</button>Lunch ($15)</div>
          <button onClick={this.SaveSession}>Save</button>
          <button onClick={this.ReturnToSessions}>Return to Sessions</button>
        </div>
      )
    }
  }
}

export default Sessions;