import { CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS, UPDATE_EVENT } from './eventConstants';
import {asyncActionError, asyncActionFinish, asyncActionStart} from '../../app/async/asyncReducer';
import { fetchSampleData } from '../../app/api/mockApi';

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

export const loadEvents = () => {
    return async function(dispatch) {
        dispatch(asyncActionStart());
        try {
            const events = await fetchSampleData();
            dispatch({type: FETCH_EVENTS, payload: events});
            dispatch(asyncActionFinish());            
        } catch (error) {
            dispatch(asyncActionError(error));            
        }
    }
}