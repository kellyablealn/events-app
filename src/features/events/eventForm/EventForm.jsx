import cuid from 'cuid';
import React from 'react';
import { Formik, Form} from 'formik';
import { Segment, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, updateEvent } from '../eventActions';
import * as Yup from 'yup';

import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';

import {categoryData} from '../../../app/api/categoryOptions';

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

    const validationSchema = Yup.object({
        title: Yup.string().required('You must provide a title'),
        category: Yup.string().required('You must provide a category'),
        description: Yup.string().required('You must provide a description'),
        city: Yup.string().required('You must provide a city'),
        venue: Yup.string().required('You must provide a venue'),
        date: Yup.string().required('You must provide a date'),
    });

    return (
        <Segment clearing>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                        selectedEvent 
                        ? dispatch(updateEvent({
                            ...selectedEvent,
                            ...values                
                        }))
                        : dispatch(createEvent({
                            ...values,
                            id: cuid(), 
                            hostedBy: 'Kelly', 
                            attendees: [],
                            hostPhotoURL: '/assets/user.png'
                        }))

                        history.push('/events');
                    }
                }>
                {({isSubmitting, dirty, isValid}) => (
                    <Form className='ui form'>
                    <Header sub color='teal' content='Event Details'/>
                    <MyTextInput name='title' placeholder='Event title'/>
                    <MySelectInput name='category' placeholder='Event category' options={categoryData}/>
                    <MyTextArea name='description' placeholder='Description' rows={3}/>
                    <Header sub color='teal' content='Event Location Details'/>
                    <MyTextInput name='city' placeholder='City'/>
                    <MyTextInput name='venue' placeholder='Venue'/>
                    <MyDateInput 
                        name='date' 
                        placeholder='Event date' 
                        timeFormat='HH:mm'
                        showTimeSelect
                        timeCaption='time'
                        dateFormat='MMMM d, yyyy h:mm a'
                    />
                    <Button 
                        loading={isSubmitting} 
                        disabled={!isValid || !dirty || isSubmitting}
                        type='submit' 
                        floated='right' 
                        positive 
                        content='Submit'/>
                    <Button 
                        disabled={isSubmitting}
                        type='button' 
                        floated='right' 
                        content='Cancel' 
                        as={Link} 
                        to='/events'
                        />
                    </Form>  
                )}                     
            </Formik>            
        </Segment>
    )
}

export default EventForm;
