import cuid from "cuid";
import { Link }  from "react-router-dom";
import React, { useState } from "react";
import { Button, Form, Header, Segment, TextArea } from "semantic-ui-react";

const EventForm = ({ setFormOpen, setEvents, createEvent, selectedEvent, updateEvent }) => {
  
  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleFormSubmit = () => {
    selectedEvent 
    ? updateEvent({...selectedEvent, ...values}) : 
    createEvent({
      ...values, 
      id:cuid(), 
      hostedBy:'Bob', 
      attendees:[] 
    });
    setFormOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setValues({ ...values, [name]: value });
  };

  return (
    <Segment clearing>
      <Header content={selectedEvent ? 'Edit event' : 'Create new event'} />
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <input
            name='title'
            type='text'
            placeholder='Event title'
            value={values.title}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            name='category'
            type='text'
            placeholder='Category'
            value={values.category}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <TextArea
            name='description'
            placeholder='Description'
            value={values.description}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            name='city'
            type='text'
            placeholder='City'
            value={values.city}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            name='venue'
            type='text'
            placeholder='Venue'
            value={values.venue}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            name='date'
            type='date'
            placeholder='Date'
            value={values.date}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Button type='submit' floated='right' positive content='Submit' />
        <Button
          as={Link}
          to='/list'
          type='submit'
          floated='right'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default EventForm;
