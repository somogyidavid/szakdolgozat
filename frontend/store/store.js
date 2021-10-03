import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import LocationReducer from './reducers/LocationReducer';

const rootReducer = combineReducers({
    location: LocationReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;