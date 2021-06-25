/* global google */
import React from "react";
import * as Yup from "yup";
import cuid from "cuid";
import { Link } from "react-router-dom";
import { categoryData } from "../../../app/api/categoryData";
import { Formik, Form } from "formik";
import { Button, Header, Segment } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { createEvent, updateEvent } from "./../eventActions";
import TextInput from "./../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import TextSelectInput from "./../../../app/common/form/SelectorInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlacesInput";

const EventForm = ({ match, history }) => {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: {
      address:"",
      latlng: null
    },
    venue: {
      address:"",
      latlng: null
    },
    date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Please enter a title"),
    category: Yup.string().required("Please enter a category name"),
    description: Yup.string().required("Please provide an event description"),
    city: Yup.object().shape({
      address: Yup.string().required("Please provide city were the event is held"),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required("Please provide the venu name")
    }),
    date: Yup.string().required("Please enter the event held date"),
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(
                createEvent({
                  ...values,
                  id: cuid(),
                  hostedBy: "Bob",
                  attendees: [],
                  hostPhotoURL: "/assets/user.png",
                })
              );
          history.push("/events");
        }}
      >
        {({ isSubmitting, dirty, isValid, values}) => (
          <Form className='ui form'>
            <Header sub color='teal' content='Event Details' />
            <TextInput name='title' placeholder='Event title' />
            <TextSelectInput
              name='category'
              placeholder='Event category'
              options={categoryData}
              rows={5}
            />
            <TextArea name='description' placeholder='Event description' />
            <Header sub color='teal' content='Event Location Details' />
            <PlaceInput name='city' placeholder='Event city' />
            <PlaceInput 
              name='venue' 
              disabled={!values.city.latlng} 
              placeholder='Venue' 
              options={{
                location: new google.maps.LatLng(values.city.latlng),
                radius: 1000,
                types: ['establishment']
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
    </Segment>
  );
};

export default EventForm;
