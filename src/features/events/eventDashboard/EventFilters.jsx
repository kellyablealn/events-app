import React from 'react';
import { Header, Menu } from 'semantic-ui-react';
import { Calendar } from 'react-calendar';
import { useSelector } from 'react-redux';

const EventFilters = ({setPredicate, predicate, loading}) => {
    const { authenticated } = useSelector(state => state.auth);

    return (
        <>
            {authenticated && (
                <Menu vertical siz='large' style={{width: '100%'}}>
                    <Header icon='filter' attached color='teal' content='Filters'/>
                    <Menu.Item 
                        content='All Events' 
                        active={predicate.get('filter') === 'all'}
                        onClick={() => setPredicate('filter', 'all')}    
                        disabled={loading}
                    />
                    <Menu.Item 
                        content="I'm going" 
                        active={predicate.get('filter') === 'isGoing'}
                        onClick={() => setPredicate('filter', 'isGoing')}    
                        disabled={loading}
                    />
                    <Menu.Item 
                        content="I'm hosting" 
                        active={predicate.get('filter') === 'isHosting'}
                        onClick={() => setPredicate('filter', 'isHosting')}    
                        disabled={loading}
                    />
                </Menu>                
            )}
            <Header icon='calendar' attached color='teal' content='Select date'/>
            <Calendar 
                onChange={date => setPredicate('startDate', date)}
                value={predicate.get('startDate') || new Date()}
                tileDisabled={() => loading}
            />
        </>
    )
}

export default EventFilters;
