import React from 'react';
import {Route, useLocation} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';

import HomePage from '../../features/events/home/HomePage';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import NavBar from '../../features/nav/NavBar';
import ModalManager from '../common/modals/ModalManager';
import ErrorComponent from '../common/errors/ErrorComponent';
import AccountPage from '../../features/auth/AccountPage';
import { useSelector } from 'react-redux';
import LoadingComponent from './LoadingComponent';
import ProfilePage from '../../features/profiles/profilePage/ProfilePage';
import PrivateRoute from './PrivateRoute';

function App() {
    
    const {key} = useLocation();
    const {initialized} = useSelector(state => state.async);

    if (!initialized) return <LoadingComponent content='Loading app...'/>

    return (
        <>
            <ModalManager />
            <ToastContainer position='bottom-right' />
            <Route exact path='/' component={HomePage} />
            <Route path={'/(.+)'} render={() => (
                <>
                    <NavBar/>
                    <Container className='main'>
                        <Route exact path='/events' component={EventDashboard} />
                        <Route exact path='/events/:id' component={EventDetailedPage} />
                        
                        <PrivateRoute 
                            exact 
                            path={['/createEvent', '/manage/:id']} 
                            component={EventForm} 
                            key={key}
                        />
                        <PrivateRoute 
                            exact 
                            path='/account' 
                            component={AccountPage}
                        />
                        <PrivateRoute 
                            exact 
                            path='/profile/:id' 
                            component={ProfilePage}
                        />
                        <Route exact path='/error' component={ErrorComponent}/>                
                    </Container>
                </>
            )}/>            
        </>
    );
}

export default App;
