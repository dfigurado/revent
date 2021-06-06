import React from "react";
import EventListItem from "./EventItem";

const EventList = ({ events, selectEvent }) => {
  return (
    <>
      {events.map((event) => (
        <EventListItem event={event} key={event.id} selectEvent={selectEvent} />
      ))}
    </>
  );
};

export default EventList;
