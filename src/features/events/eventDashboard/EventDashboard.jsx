import React, {useState} from 'react';
import { Grid} from 'semantic-ui-react';
import EventList from './EventsList';
import {sampleData} from '../../../app/api/sampleData';

const EventDashboard = ({history}) => {
    const [events, setEvents] = useState(sampleData);
    
    // const createEvent = (event) => {
    //     setEvents([...events, event]);
    // }

    // const updateEvent = (updatedEvent) => {
    //     setEvents(events.map(evt => (
    //         evt.id === updatedEvent.id ? updatedEvent : evt
    //     )));
    // }

    const deleteEvent = (eventId) => {
        setEvents(events.filter(evt => (
            evt.id !== eventId
        )));
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList events={events} deleteEvent={deleteEvent}/>
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Event Filters</h2>
            </Grid.Column>
        </Grid>
    )
}

export default EventDashboard;
