import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Image, Item, Segment } from "semantic-ui-react";

const EventDetailedHeader = ({ event }) => {
  const eventImageStyle = {
    filter: "brightness(30%)",
  };

  const eventImageTextStyle = {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    width: "100%",
    height: "auto",
    color: "white",
  };

  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpg`}
          fluid
          style={eventImageStyle}
        />
        <Segment basic style={eventImageTextStyle}>
          <Item>
            <Item.Content>
              <Header
                size='huge'
                content={event.title}
                style={{ color: "white" }}
              />
              <p>{format(event.date, "MMMM d, yyyy h:mm a")}</p>
              <p>
                Hosted by <string>{event.hostedBy}</string>
              </p>
            </Item.Content>
          </Item>
        </Segment>
      </Segment>
      <Segment>
        <Button>Cancel My Place</Button>
        <Button colo='teal'>JOIN THIS EVENT</Button>
        <Button
          as={Link}
          to={`/manage/${event.id}`}
          color='orange'
          floated='right'
        >
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailedHeader;
