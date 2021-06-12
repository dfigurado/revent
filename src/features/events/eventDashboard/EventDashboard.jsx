import React, { useState } from "react";
import EventList from "./EventList";
import { Grid } from "semantic-ui-react";
import { sampleData } from "./../../../app/api/sample";

const EventDashboard = () => {
  const [events, setEvents] = useState(sampleData);

  /*
  const handleCreateEvent = (event) => {
    setEvents([...events, event]);
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents(events.map(evt => evt.id === updatedEvent.id ? updatedEvent : evt));
    selectEvent(null);
  }
  */

  const handleDelete = (eventId) => {
    setEvents(events.filter((evt) => evt.id !== eventId));
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} deleteEvent={handleDelete} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Event Filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
