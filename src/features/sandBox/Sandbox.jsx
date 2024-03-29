import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "./../../app/common/modals/modalReducer";
import TestMap from "./TestMap";
import TestPlaceInput from "./TestPlaceInput";
import { decrement, increment } from "./testReducer";

const Sandbox = () => {
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };
  const dispatch = useDispatch();

  const data = useSelector((state) => state.test.data);
  const { loading } = useSelector((state) => state.async);

  const [target, setTarget] = useState(null);
  const [location, setLocation] = useState(defaultProps);

  function handleSelectedLocation(latlng) {
    setLocation({ ...location, center: { lat: latlng.lat, lng: latlng.lng } });
  }

  return (
    <>
      <h1>Testing 123 </h1>
      <h3>The data is:{data}</h3>
      <Button
        name='increment'
        loading={loading && target === "increment"}
        onClick={(e) => {
          dispatch(increment(10));
          setTarget(e.target.name);
        }}
        content='Increment'
        color='green'
      />
      <Button
        name='decrement'
        loading={loading && target === "decrement"}
        onClick={(e) => {
          dispatch(decrement(10));
          setTarget(e.target.name);
        }}
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
