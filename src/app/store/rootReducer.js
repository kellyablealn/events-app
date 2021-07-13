import { combineReducers } from 'redux';
import eventReducer from '../../features/events/eventReducer';
import modalReducer from '../common/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';
import asyncReducer from '../../app/async/asyncReducer';
import profileReducer from '../../features/profiles/profileReducer';

const rootReducer = combineReducers({
    event: eventReducer,
    modals: modalReducer,
    auth: authReducer,
    async: asyncReducer,
    profile: profileReducer
});

export default rootReducer;