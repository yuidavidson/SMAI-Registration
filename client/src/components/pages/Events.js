import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import api from "../../api/api";
import CampModel from "../../models/camp";
import SessionModel from "../../models/session";
import {makeUrl} from "../../utils/nav-utils";

const Events = () => {
  /**
   * @param {Array<CampModel>} events
   */
  const [eventList, setEvents] = useState([]);
  useEffect(() => {
    api.run('events', null, true)
      .then((response) => {
        let data = response.data.map(item => new CampModel({
            ...item,
            startDate: new Date(item.startDate * 1000).toLocaleDateString(),
            endDate: new Date(item.endDate * 1000).toLocaleDateString(),
            regStartDate: new Date(item.regStartDate * 1000).toLocaleDateString(),
            regEndDate: new Date(item.regEndDate * 1000).toLocaleDateString()
        }));
        setEvents(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const [eventSessions, setEventSessions] = useState({});
  const [eventError, setEventError] = useState({});
  const getSessions = (eventId) => {
    api.run('event/sessions', {eventId}, true)
      .then((response) => {
        let data = response.data.map(item => new SessionModel({
          ...item,
          startDate: new Date(item.startDate * 1000).toLocaleDateString(),
          endDate: new Date(item.endDate * 1000).toLocaleDateString(),
        }));
        // console.log({...eventSessions, [eventId]: [...data]});
        setEventSessions({...eventSessions, [eventId]: [...data]});
      })
      .catch((error) => {
        // INTENTIONALLY NOT COPY PREVIOUS value: {...eventSessionsError, newstuff: {}}
        // only show last error
        setEventError({[eventId]: error.toString()});
        console.log(error);
      });
  };

  const onSessionsClickCb = (eventId, e) => {
    e.preventDefault();
    getSessions(eventId);
  };

  return <section>
    <h1>Events/Camps</h1>
    {eventList.map((/** @param {CampModel} event */ event) =>
    <div key={event.name} className='event'>
      <h2>{event.name} </h2>
      <div>{event.startDate} - {event.endDate}</div>
      <div>{event.maxQuota} campers max</div>
      <div className='sessions'>
        {eventSessions[event.id] ? <h3>Sessions</h3>:<a href='#sessions' onClick={e => onSessionsClickCb(event.id, e)}>Sessions Details</a>}
        {eventSessions[event.id] && eventSessions[event.id].map(session =>
          <div>
            <h4>{session.name}</h4>
            <div>{session.startDate} - {session.endDate}</div>
          </div>
        )}
        {eventError[event.id] && <span style={{color: 'red'}}>{eventError[event.id]}</span>}
      </div>
      <Link to={makeUrl('/register/'+event.urlName)}>Register</Link>
    </div>)}
  </section>
};

export default Events;