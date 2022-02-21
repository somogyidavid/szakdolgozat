import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import LocationReducer from './reducers/LocationReducer';
import AuthReducer from './reducers/AuthReducers';
import ActivitiesReducer from './reducers/ActivitiesReducer';
import SightsReducer from './reducers/SightsReducer';
import PlaceDetailsReducer from './reducers/PlaceDetailsReducer';
import UserActivitiesReducer from './reducers/UserActivitiesReducer';
import UserReducer from './reducers/UserReducer';
import StatisticsReducer from './reducers/StatisticsReducer';

const rootReducer = combineReducers({
    location: LocationReducer,
    activities: ActivitiesReducer,
    sights: SightsReducer,
    placeDetails: PlaceDetailsReducer,
    userActivities: UserActivitiesReducer,
    statistics: StatisticsReducer,
    user: UserReducer,
    auth: AuthReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;