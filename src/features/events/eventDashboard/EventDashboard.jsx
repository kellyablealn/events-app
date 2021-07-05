import React from 'react';
import { Grid} from 'semantic-ui-react';
import EventList from './EventsList';
import EventForm from '../eventForm/EventForm';
import {sampleData} from '../../../app/api/sampleData';

const EventDashboard = ({formOpen, setFormOpen}) => {

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList events={sampleData}/>
            </Grid.Column>
            <Grid.Column width={6}>
                {formOpen && <EventForm setFormOpen={setFormOpen}/>}
            </Grid.Column>
        </Grid>
    )
}

export default EventDashboard;
