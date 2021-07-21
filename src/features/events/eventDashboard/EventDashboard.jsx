import React, { useEffect, useState } from 'react';
import { Button, Grid} from 'semantic-ui-react';
import EventList from './EventsList';
import { useDispatch, useSelector } from 'react-redux';

import EventListItemPlaceholder from './EventListItemPlaceholder';
import EventFilters from './EventFilters';
import { clearEvents, fetchEvents } from '../eventActions';
import EventFeed from './EventFeed';

const EventDashboard = ({history}) => {
    const limit = 2;
    const dispatch = useDispatch();
    const {events, moreEvents} = useSelector(state => state.event);
    const {loading} = useSelector(state => state.async);
    const {authenticated} = useSelector(state => state.auth);
    const [ lastDocSnapshot, setLastDocSnapshot ] = useState(null);
    const [ loadingInitial, setLoadingInitial ] = useState(false);

    const [predicate, setPredicate] = useState(new Map([
        ['startDate', new Date()],
        ['filter', 'all']
    ]));

    function handleSetPredicate(key, value) {
        dispatch(clearEvents());
        setLastDocSnapshot(null);
        setPredicate(new Map(predicate.set(key, value)));
    }

    useEffect(() => {
        setLoadingInitial(true);
        dispatch(fetchEvents(predicate, limit)).then((lastVisible) => {
            setLastDocSnapshot(lastVisible);
            setLoadingInitial(false);
        });

        return () => {
            dispatch(clearEvents());
        }
    }, [dispatch, predicate]);

    function handleFetchNextEvents() {
        dispatch(fetchEvents(predicate, limit, lastDocSnapshot)).then((lastVisible) => {
            setLastDocSnapshot(lastVisible);
        })
    }

    return (
        <Grid>
            <Grid.Column width={10}>
            {loadingInitial &&
                <>
                    <EventListItemPlaceholder/>
                    <EventListItemPlaceholder/>
                </>
            }
                <EventList events={events}/>
                <Button 
                    loading={loading}
                    disabled={!moreEvents}
                    onClick={handleFetchNextEvents}
                    color='green'
                    content='More...'
                    floated='right'
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {authenticated && (
                    <EventFeed/>
                )}
                <EventFilters predicate={predicate} setPredicate={handleSetPredicate} loading={loading}/>
            </Grid.Column>
        </Grid>
    )
}

export default EventDashboard;
