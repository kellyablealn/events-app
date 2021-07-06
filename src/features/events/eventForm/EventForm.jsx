import cuid from 'cuid';
import React, { useState } from 'react';
import { Segment, Header, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, updateEvent } from '../eventActions';

const EventForm = ({match, history}) => {
    
    const dispatch = useDispatch();
    const selectedEvent = useSelector(state => state.event.events.find(e => e.id === match.params.id));

    const initialValues = selectedEvent ?? {
        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        date: ''
    };

    const [values, setValues] = useState(initialValues);
    
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});

    }
    
    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (selectedEvent)
            dispatch(updateEvent({
                ...selectedEvent,
                ...values                
            }));
        else 
            dispatch(createEvent({
                ...values,
                id: cuid(), 
                hostedBy: 'Kelly', 
                attendees: [],
                hostPhotoURL: '/assets/user.png'
            }));
        
            history.push('/events');
    }

    return (
        <Segment clearing>
            <Header content={selectedEvent ? 'Edit the event' : 'Create new event'}/>
            <Form onSubmit={handleFormSubmit}>
                <Form.Field>
                    <input 
                        type='text' 
                        placeholder='Event title' 
                        name='title'
                        value={values.title} 
                        onChange={handleInputChange}/>
                </Form.Field>
                <Form.Field>
                    <input 
                        type='text' 
                        placeholder='Category'
                        name='category'
                        value={values.category} 
                        onChange={handleInputChange}/>
                </Form.Field>
                <Form.Field>
                    <input 
                        type='text' 
                        placeholder='Description'
                        name='description'
                        value={values.description} 
                        onChange={handleInputChange}/>
                </Form.Field>
                <Form.Field>
                    <input 
                        type='text' 
                        placeholder='City'
                        name='city'
                        value={values.city} 
                        onChange={handleInputChange}/>
                </Form.Field>
                <Form.Field>
                    <input 
                        type='text' 
                        placeholder='Venue'
                        name='venue'
                        value={values.venue} 
                        onChange={handleInputChange}/>
                </Form.Field>
                <Form.Field>
                    <input 
                        type='date' 
                        placeholder='Date'
                        name='date'
                        value={values.date} 
                        onChange={handleInputChange}/>
                </Form.Field>
                <Button type='submit' floated='right' positive content='Submit'/>
                <Button 
                    type='button' 
                    floated='right' 
                    content='Cancel' 
                    as={Link} 
                    to='/events'
                    />
            </Form>
        </Segment>
    )
}

export default EventForm;
