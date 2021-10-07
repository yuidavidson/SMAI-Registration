import React from 'react';

// eventually make it so the sessions aren't hard coded
const Sessions = (props) => {
  const sessions = props.sessions;
  const sessionList = sessions.map((session) =>
    <div key={session.toString()}>
      <button onClick={() => props.SelectSessions(session)}>x</button>
      {session}
    </div>
  );
  return (
    <div>{sessionList}</div>
  )
};

export default Sessions;