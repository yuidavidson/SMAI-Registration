import React, {useEffect} from 'react';


const sessionX = {
  "name": 'name',
  "organizer": 'organizer',
  "campId": 'campId',
  "startDate": 'startDate',
  "endDate": 'endDate',
  "minQuota": 'minQuota',
  "maxQuota": 'maxQuota',
  "notes": 'notes',
  "internalName": 'internalName'
};
const sessionRegX = {
  "registrationId": 'registrationId',
  "sessionId": 'sessionId',
  "mealId": 'mealId',
  "foodPreferenceId": 'foodPreferenceId',
  "crewId": 'crewId'
};

/**
 *
 * @param {SessionModel} session
 * @param {SessionRegistrationModel} sessionReg
 * @returns {JSX.Element}
 * @constructor
 */
const Session = ({session=sessionX, sessionReg=sessionRegX}) => {
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