import React from 'react';
import axios from 'axios';

import Party from './Party.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    // dummy data for testing
    this.state = {
      account: 'SMF034',
      camper: 'Joshua Freeman',
      party : [
        'Karen Freeman',
        'David Konno',
        'Shelli Smart',
        'Cedar Dobson',
      ]
    };
  };

  render() {
    return (
      <div>
        <div>Account {this.state.account}</div>
        <div>{this.state.camper}</div>
        <div>Who will you register?</div>
        <div>choose one</div>
        {/* include edit button for each camper and also a marker to show it was finished */}
        <div party={this.state.party}>placeholder for list of party</div>
        <Party party={this.state.party}/>
        <button>next</button>
      </div>
    )
  }
};

export default App;