import React from 'react';

// eventually make it so the sessions aren't hard coded
const Sessions = (props) => {
  const sessions = props.sessions;
  const sessionList = sessions.map((session) =>
    <div key={session.toString()}>
      {/* Add a key to the buttons -> fix so buttons are next to the sessions, which I might do in styles */}
      <button>x</button>
      {session}
    </div>
  );
  return (
    <div>{sessionList}</div>
  )
};

export default Sessions;