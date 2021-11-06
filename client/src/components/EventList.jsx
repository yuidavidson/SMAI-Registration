import React from 'react';

const EventList = (props) => {
  console.log(new Date(props.events[0].startDate * 1000).toString());
  const events = props.events;
  const eventList = events.map((event) =>
    <div key={event.name}>
      <div>{event.name}</div>
      <div>{event.startDate.month} {event.startDate.date} - {event.endDate.month} {event.endDate.date}</div>
      <button onClick={() => props.switchAndSet('register', 'event', event)}>Register</button>
    </div>
  );
  return (
    <div>
      {eventList}
    </div>
  )
}

export default EventList;