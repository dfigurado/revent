import React from "react";
import { Grid } from "semantic-ui-react";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSideBar from "./EventDetailedSidebar";
import { useSelector } from "react-redux";

const EventDetailedPage = ({ match }) => {
  const event = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSideBar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default EventDetailedPage;
