/* global google */
import React, { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { categoryData } from "../../../app/api/categoryData";
import { Formik, Form } from "formik";
import { Button, Header, Segment, Confirm } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { listenToEvents } from "./../eventActions";
import TextInput from "./../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import TextSelectInput from "./../../../app/common/form/SelectorInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlacesInput";
import useFirestoreDoc from "./../../../app/hooks/useFirestoreDoc";
import {
  addEventToFirestore,
  listenToEventFromFirestore,
  updateEventInFirestore,
} from "./../../../app/firestore/firestoreService";
import LoadingComponent from "./../../../app/layout/LoadingComponent";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { cancelEventToggle } from "./../../../app/firestore/firestoreService";

const EventForm = ({ match, history }) => {
  const dispatch = useDispatch();
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );
  const { loading, error } = useSelector((state) => state.async);

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: {
      address: "",
      latlng: null,
    },
    venue: {
      address: "",
      latlng: null,
    },
    date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Please enter a title"),
    category: Yup.string().required("Please enter a category name"),
    description: Yup.string().required("Please provide an event description"),
    city: Yup.object().shape({
      address: Yup.string().required(
        "Please provide city were the event is held"
      ),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required("Please provide the venu name"),
    }),
    date: Yup.string().required("Please enter the event held date"),
  });

  async function handleCancelToggle(event) {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);
      setLoadingCancel(false);
    } catch (error) {
      setLoadingCancel(true);
      toast.error(error.message);
    }
  }

  useFirestoreDoc({
    shouldExcecute: !!match.params.id,
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  });

  if (loading) return <LoadingComponent content='Loading event...' />;

  if (error) return <Redirect to='/error' />;

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values);
            setSubmitting(false);
            history.push("/events");
          } catch (error) {
            console.log(error);
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className='ui form'>
            <Header sub color='teal' content='Event Details' />
            <TextInput name='title' placeholder='Event title' />
            <TextSelectInput
              name='category'
              placeholder='Event category'
              options={categoryData}
            />
            <TextArea
              name='description'
              placeholder='Event description'
              rows={5}
            />
            <Header sub color='teal' content='Event Location Details' />
            <PlaceInput name='city' placeholder='Event city' />
            <PlaceInput
              name='venue'
              disabled={!values.city.latlng}
              placeholder='Venue'
              options={{
                location: new google.maps.LatLng(values.city.latlng),
                radius: 1000,
                types: ["establishment"],
              }}
            />
            <DateInput
              name='date'
              placeholderText='Event date'
              timeFormat='HH:mm'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm a'
            />
            {selectedEvent && (
              <Button
                loading={loadingCancel}
                type='button'
                floated='left'
                color={selectedEvent.isCancelled ? "green" : "red"}
                content={
                  selectedEvent.isCancelled
                    ? "Reactivate event"
                    : "Cancel event"
                }
                onClick={() => setConfirmOpen(true)}
              />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              floated='right'
              positive
              content='Submit'
            />
            <Button
              disabled={isSubmitting}
              as={Link}
              to='/events'
              type='submit'
              floated='right'
              content='Cancel'
            />
          </Form>
        )}
      </Formik>
      <Confirm
        content={
          selectedEvent?.isCancelled
            ? "This will reactivate the event - are you sure"
            : "This will cancel the event - are you sure?"
        }
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedEvent)}
      />
    </Segment>
  );
};

export default EventForm;
