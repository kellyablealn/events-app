import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import {NavLink, useHistory} from 'react-router-dom';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';
import { useSelector } from 'react-redux';

const NavBar = () => {
    const {authenticated} = useSelector(state => state.auth);
    const history = useHistory();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} exact to='/' header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight: 15}}/>
                    Re-events
                </Menu.Item>
                <Menu.Item as={NavLink} to='/events' name='Events'/>
                {authenticated && (<Menu.Item as={NavLink} to='/createEvent'>
                    <Button positive inverted content='Create Event' onClick={() => history.push('/createEvent')}/>
                </Menu.Item>)}
                {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
            </Container>
        </Menu>
    )
}

export default NavBar;