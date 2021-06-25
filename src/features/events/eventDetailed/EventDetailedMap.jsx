import React from "react";
import { Segment, Icon } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";

const Marker = () => {
  return <Icon name='marker' size='big' color='red' />;
};

const EventDetailedMap = ({ latlng }) => {
  const zoom = 14;
  return (
    <Segment attached='button' style={{ padding: 0 }}>
      <div style={{ height: 300, width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCcPkFk32eip5YQz3W5_PTn9PqKKX-8ukU" }}
          center={latlng}
          zoom={zoom}
        >
          <Marker lat={latlng.lat} lng={latlng.lng} />
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

export default EventDetailedMap;
