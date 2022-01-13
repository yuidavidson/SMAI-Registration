import React, {useEffect} from 'react';
/**
 *
 * @param {SessionModel} session
 * @param {SessionRegistrationModel} sessionReg
 * @returns {JSX.Element}
 * @constructor
 */
const Session = ({session, sessionReg}) => {
  return <section>
    <h1>Session</h1>
    {session ? <div>{session.name}: {session.startDate} - {session.endDate}</div> : null}
    {sessionReg ? <div>
        Meal: {sessionReg.mealId}<br/>
        Food Pref: {sessionReg.foodPreferenceId}<br/>
        Crew: {sessionReg.crewId}</div>
      : null}
  </section>
};

export default Session;