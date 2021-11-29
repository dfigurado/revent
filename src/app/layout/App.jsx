import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";
import NavBar from "../../features/nav/NavBar";
import ErrorComponent from "../common/errors/ErrorComponent";
import ModalManager from "../common/modals/ModalManager";
import AccountPage from "./../../features/auth/AccountPage";
import EventForm from "./../../features/events/eventForm/EventForm";
import HomePage from "./../../features/home/HomePage";
import Sandbox from "./../../features/sandBox/Sandbox";
import LoadingComponent from "./LoadingComponent";

function App() {
  const { key } = useLocation();
  const { initialized } = useSelector((state) => state.async);

  if (!initialized) return <LoadingComponent content='Loading app...' />;

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
              <Route path='/account' component={AccountPage} />
              <Route path='/error' component={ErrorComponent} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
