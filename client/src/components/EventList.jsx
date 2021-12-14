import React from 'react';

import Overlay from './Overlay.jsx';
import { StyledButton, ContentWrapper, StyledHead, RowWrapper } from './Styles.jsx';

const EventList = (props) => {
  const events = props.events;
  const eventList = events.map((event) =>
    <div key={event.name}>
      <ContentWrapper>
        <StyledHead fontSize={15}>{event.name}</StyledHead>
        <div>{event.startDate.month} {event.startDate.date} - {event.endDate.month} {event.endDate.date} {event.startDate.year}</div>
        <RowWrapper>
          <StyledButton onClick={() => props.openModal(event.name)}>Details</StyledButton>
          <StyledButton onClick={() => props.switchAndSet('register', 'event', event)}>Register</StyledButton>
        </RowWrapper>
      </ContentWrapper>
      <Overlay currentId={props.modalState} close={props.closeModal} myId={event.name}>
        <ContentWrapper>
          <StyledHead fontSize={20}>{event.name}</StyledHead>
          <div>{event.startDate.month} {event.startDate.date} {event.startDate.year === event.endDate.year ? null : event.startDate.year}- {event.endDate.month} {event.endDate.date} {event.startDate.year}</div>
          <div>Orgainzer: {event.organizer}</div>
          <div>max-cutoff: {event.maxQuota}</div>
          <div>Notes: {event.notes}</div>
        </ContentWrapper>
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