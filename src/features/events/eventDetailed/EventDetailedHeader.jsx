import React, { useState } from 'react';
import { Segment, Image, Item, Button, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {format} from 'date-fns';
import { addUserAttendance, cancelUserAttendance } from '../../../app/firestore/firestoreService';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import UnauthModal from '../../auth/UnauthModal';

const eventImageStyle = {
    filter: 'brightness(30%)'
};

const eventImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};


const EventDetailedHeader = ({event, isHost, isAttendee}) => {
    
    const [loading, setLoading] = useState(false);
    const {authenticated} = useSelector(state => state.auth);
    const [modalOpen, setModalOpen] = useState(false);

    async function handleUserJoinEvent() {
        setLoading(true);
        try {
            await addUserAttendance(event);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleUserLeaveEvent() {
        setLoading(true);
        try {
            await cancelUserAttendance(event);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {modalOpen && <UnauthModal setModalOpen={setModalOpen}/>}
            <Segment.Group>
                <Segment basic attached="top" style={{padding: '0'}}>
                    <Image 
                        src={`/assets/categoryImages/${event.category}.jpg`} 
                        fluid 
                        style={eventImageStyle}/>

                    <Segment basic style={eventImageTextStyle}>
                        <Item.Group>
                            <Item>
                                <Item.Content>
                                    <Header
                                        size="huge"
                                        content={event.title}
                                        style={{color: 'white'}}
                                    />
                                    <p>{format(event.date, 'MMMM d, yyyy h:mm a')}</p>
                                    <p>
                                        Hosted by <strong><Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link></strong>
                                    </p>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                </Segment>

                <Segment attached="bottom" clearing>
                    { !isHost &&
                        (
                            <>
                                {isAttendee 
                                    ? (<Button
                                        loading={loading}
                                        onClick={handleUserLeaveEvent}
                                    >Cancel My Place</Button>) 
                                    : (<Button 
                                        loading={loading}
                                        onClick={authenticated ?  handleUserJoinEvent: () => setModalOpen(true)} 
                                        color="teal">JOIN THIS EVENT</Button>)
                                }
                            </>
                        )
                    }

                    {isHost &&
                        (<Button as={Link} to={`/manage/${event.id}`} color="orange" floated="right">
                            Manage Event
                        </Button>)
                    }
                </Segment>
        </Segment.Group>
        </>        
    )
}

export default EventDetailedHeader;
