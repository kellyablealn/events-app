import React from 'react';
import EventListItem from './EventListItem';

const EventsList = ({events, deleteEvent}) => {
    return (
        <>  
            {events.map(event => (
                <EventListItem key={event.id} event={event} deleteEvent={deleteEvent}/>
            ))}
        </>
    )
}

export default EventsList;
