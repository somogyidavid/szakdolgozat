import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import LocationReducer from './reducers/LocationReducer';
import AuthReducer from './reducers/AuthReducers';
import ActivitiesReducer from './reducers/ActivitiesReducer';

const rootReducer = combineReducers({
    location: LocationReducer,
    activities: ActivitiesReducer,
    auth: AuthReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;