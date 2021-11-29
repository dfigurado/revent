import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { signOutFirebase } from "../../app/firestore/firebaseService";

const SignedInMenu = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const history = useHistory();

  async function handleSignedOut() {
    try {
      history.push("/");
      await signOutFirebase();
    } catch (error) {
      toast.error(error);
    }
  }
  return (
    <Menu.Item position='right'>
      <Image
        avatar
        space='right'
        src={currentUser.photoURL || "/assets/user.png"}
      />
      <Dropdown pointing='top left' text={currentUser.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to='/createEvent'
            text='Create Event'
            icon='plus'
          />
          <Dropdown.Item text='My Profile' icon='user' />
          <Dropdown.Item
            as={Link}
            to='/account'
            text='My Account'
            icon='settings'
          />
          <Dropdown.Item
            onClick={handleSignedOut}
            text='Sign out'
            icon='power'
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;
