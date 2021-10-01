import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import LocationReducer from './reducers/LocationReducer';

const rootReducer = combineReducers({
    location: LocationReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;