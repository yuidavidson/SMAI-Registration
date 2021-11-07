import React from 'react';

import Overlay from './Overlay.jsx';
import { StyledButton } from './Styles.jsx';

const EventList = (props) => {
  const events = props.events;
  const eventList = events.map((event) =>
    <div key={event.name}>
      <div>{event.name}</div>
      <div>{event.startDate.month} {event.startDate.date} - {event.endDate.month} {event.endDate.date} {event.startDate.year}</div>
      <button onClick={() => props.openModal(event.name)}>Details</button>
      <StyledButton onClick={() => props.switchAndSet('register', 'event', event)}>Register</StyledButton>
      <Overlay currentId={props.modalState} close={props.closeModal} myId={event.name}>
        <h3>{event.name}</h3>
        <div>{event.startDate.month} {event.startDate.date} - {event.endDate.month} {event.endDate.date} {event.startDate.year}</div>
        <div>Orgainzed by {event.organizer}</div>
        <div>max-cutoff: {event.maxQuota}</div>
        <div>Notes: </div>
        <div>{event.notes}</div>
      </Overlay>
    </div>
  );
  return (
    <div>
      {eventList}
    </div>
  )
}

export default EventList;