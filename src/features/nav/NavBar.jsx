import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container, Menu } from "semantic-ui-react";
import SignedOutMenu from "./signedOutMenu";
import SignedInMenu from "./signedInMenu";

const NavBar = ({ setFormOpen }) => {
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} exact to='/' header>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: 15 }} />
        </Menu.Item>
        <Menu.Item as={NavLink} to='/events' name='Events'>
          Events
        </Menu.Item>
        <Menu.Item as={NavLink} to='sandbox' name='Sandbox' />
        {authenticated && (
          <Menu.Item as={NavLink} to='/createEvent'>
            <Button positive inverted content='Create Event' />
          </Menu.Item>
        )}
        {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
      </Container>
    </Menu>
  );
};

export default NavBar;
