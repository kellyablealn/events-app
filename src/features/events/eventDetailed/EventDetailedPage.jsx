import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSideBar from './EventDetailedSideBar';
import { useDispatch, useSelector } from 'react-redux';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { listenToEventFromFirestore } from '../../../app/firestore/firestoreService';
import { listenToSelectedEvent } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Redirect } from 'react-router-dom';

const EventDetailedPage = ({match}) => {
    const event = useSelector(state => state.event.selectedEvent);
    const {currentUser} = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.async);

    const isHost = event?.hostUid === currentUser.uid;
    const isAttendee = event?.attendees?.some(a => a.id === currentUser.uid);

    useFirestoreDoc({
        query: () => listenToEventFromFirestore(match.params.id),
        data: event => dispatch(listenToSelectedEvent(event)),
        deps: [match.params.id, dispatch]
    });

    if (loading || (!event && !error)) return <LoadingComponent content='Loading event...'/>;
    
    if (error) return <Redirect to='/error'/>

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventDetailedHeader event={event} isHost={isHost} isAttendee={isAttendee}/>
                <EventDetailedInfo event={event}/>
                <EventDetailedChat eventId={event.id}/>
            </Grid.Column>
            <Grid.Column width={6}>
                <EventDetailedSideBar attendees={event?.attendees} hostUid={event.hostUid} eventId={event.id}/>
            </Grid.Column>
        </Grid>
    )
}

export default EventDetailedPage;
