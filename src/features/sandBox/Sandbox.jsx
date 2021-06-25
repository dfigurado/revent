import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { increment, decrement } from "./testReducer";
import { openModal } from "./../../app/common/modals/modalReducer";
import TestPlaceInput from "./TestPlaceInput";
import TestMap from "./TestMap";

const Sandbox = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.test.data);
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  const [location, setLocation] = useState(defaultProps);

  function handleSelectedLocation(latlng) {
    setLocation({ ...location, center: { lat: latlng.lat, lng: latlng.lng } });
  }

  return (
    <>
      <h1>Testing 123 </h1>
      <h3>The data is:{data}</h3>
      <Button
        onClick={() => dispatch(increment(20))}
        content='Increment'
        color='green'
      />
      <Button
        onClick={() => dispatch(decrement(10))}
        content='Decrement'
        color='red'
      />
      <Button
        onClick={() =>
          dispatch(openModal({ modalType: "TestModal", modalProps: { data } }))
        }
        content='Open Modal'
        color='teal'
      />
      <div style={{ marginTop: 15 }}>
        <TestPlaceInput setLocation={handleSelectedLocation} />
        <br></br>
        <TestMap location={location} />
      </div>
    </>
  );
};

export default Sandbox;