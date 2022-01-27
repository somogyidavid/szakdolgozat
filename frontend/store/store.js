import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import LocationReducer from './reducers/LocationReducer';
import AuthReducer from './reducers/AuthReducers';
import ActivitiesReducer from './reducers/ActivitiesReducer';
import SightsReducer from './reducers/SightsReducer';

const rootReducer = combineReducers({
    location: LocationReducer,
    activities: ActivitiesReducer,
    sights: SightsReducer,
    auth: AuthReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;