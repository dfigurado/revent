import React from "react";
import { Grid } from "semantic-ui-react";
import EventDetailedInfo from "./eventDetailedInfo";
import EventDetailedHeader from "./eventDetailedHeader";
import EventDetailedChat from "./eventDetailedChat";
import EventDetailedSidebar from "./eventDetailedSideBar";

const EventDetailedPage = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader />
        <EventDetailedInfo />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default EventDetailedPage;
