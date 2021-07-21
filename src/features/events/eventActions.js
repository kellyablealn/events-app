import { CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS, LISTEN_TO_EVENT_CHAT, UPDATE_EVENT, LISTEN_TO_SELECTED_EVENT, CLEAR_EVENTS } from './eventConstants';
import {asyncActionError, asyncActionFinish, asyncActionStart} from '../../app/async/asyncReducer';
import { dataFromSnapshot, fetchEventsFromFirestore } from '../../app/firestore/firestoreService';

export const createEvent = (event) => {
    return {
        type: CREATE_EVENT,
        payload: event
    }
}

export const updateEvent = (event) => {
    return {
        type: UPDATE_EVENT,
        payload: event
    }
}

export const deleteEvent = (eventId) => {
    return {
        type: DELETE_EVENT,
        payload: eventId
    }
}

export const fetchEvents = (predicate, limit, lastDocSnaphot) => {
    return async function(dispatch) {
        dispatch(asyncActionStart());
        try {
            const snapshot = await fetchEventsFromFirestore(predicate, limit, lastDocSnaphot).get();
            const lastVisible = snapshot.docs[snapshot.docs.length-1];
            const moreEvents = snapshot.docs.length >= limit;
            const events = snapshot.docs.map(doc => dataFromSnapshot(doc));
            dispatch({type: FETCH_EVENTS, payload: {events, moreEvents}});
            dispatch(asyncActionFinish());      
            return lastVisible;      
        } catch (error) {
            dispatch(asyncActionError(error));            
        }
    }
}

export const listenToSelectedEvent = (event) => {
    return {
        type: LISTEN_TO_SELECTED_EVENT,
        payload: event
    }
}

export const listenToEventChat = (comments) => {
    return {
        type: LISTEN_TO_EVENT_CHAT,
        payload: comments
    }
}

export function clearEvents() {
    return {
        type: CLEAR_EVENTS
    }
}