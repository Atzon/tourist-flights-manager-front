import {FETCH_FLIGHTS, UPDATE_FLIGHT_LIST, DELETE_FLIGHT} from "../actions";

export default function(state = [], action){
    switch(action.type){
        case FETCH_FLIGHTS:
            state = action.payload;
            return state;
        case DELETE_FLIGHT:
            return state.filter(flight => flight.key !== action.payload.key);
        case UPDATE_FLIGHT_LIST:
            return state.map(flight => {
                if (flight.key === action.payload.key) {
                    return action.payload
                }
                return flight
            });
    }
    return state;
}