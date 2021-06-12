import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import SignedOutMenu from "./signedOutMenu";
import SignedInMenu from "./signedInMenu";

const NavBar = ({ setFormOpen }) => {

  const history = useHistory();
  const [authenticated, setAutenticated] = useState(false);

  const handleSignOut = () => {
    setAutenticated(false);
    history.push('/');
  }

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} exact to='/' header>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: 15 }} />
        </Menu.Item>
        <Menu.Item as={NavLink} to='/events' name='Events'>
          Events
        </Menu.Item>
        {authenticated && (
          <Menu.Item as={NavLink} to='/createEvent'>
            <Button positive inverted content='Create Event' />
          </Menu.Item>
        )}
        {authenticated ? <SignedInMenu signOut={handleSignOut}/> : <SignedOutMenu setAutenticated={setAutenticated} />}
      </Container>
    </Menu>
  );
};

export default NavBar;
