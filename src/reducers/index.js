import { combineReducers } from 'redux';
import touristsReducer from './touristsReducer';
import flightsReducer from './flightsReducer';
import currentTourist from './currentTouristReducer';
import currentFlight from './currentFlightReducer';

import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    tourists: touristsReducer,
    flights: flightsReducer,
    currentTourist: currentTourist,
    currentFlight: currentFlight,
    form: formReducer
});

export default rootReducer;