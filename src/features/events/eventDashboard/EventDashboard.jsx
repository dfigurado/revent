import React, { useEffect } from "react";
import EventList from "./EventList";
import { Grid } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceHolder";
import EventFilters from "./EventFilters";
import {
  getEventsFromFirestore,
  dataFromSnapshot,
} from "./../../../app/firestore/firestoreService";
import { listenToEvents } from "../eventActions";
import {
  asyncActionFinish,
  asyncActionStart,
  asyncActionError,
} from "./../../../app/async/asynchReducer";

const EventDashboard = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = getEventsFromFirestore({
      next: (snapshot) => {
        dispatch(
          listenToEvents(
            snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
          )
        );
        dispatch(asyncActionFinish());
      },
      error: (error) => dispatch(asyncActionError(error)),
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
