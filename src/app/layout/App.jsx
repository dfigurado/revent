import React, { Fragment } from "react";
import NavBar from "../../features/nav/NavBar";
import Sandbox from "./../../features/sandBox/Sandbox";
import HomePage from "./../../features/home/HomePage";
import EventForm from "./../../features/events/eventForm/EventForm";
import ModalManager from "../common/modals/ModalManager";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";

import { Route } from "react-router";
import { Container } from "semantic-ui-react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ErrorComponent from "../common/errors/ErrorComponent";

function App() {
  const { key } = useLocation();

  return (
    <>
      <ModalManager />
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container className='main'>
              <Route exact path='/events' component={EventDashboard} />
              <Route exact path='/sandbox' component={Sandbox} />
              <Route path='/events/:id' component={EventDetailedPage} />
              <Route
                path={["/createEvent", "/manage/:id"]}
                component={EventForm}
                key={key}
              />
              <Route path='/error' component={ErrorComponent} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
