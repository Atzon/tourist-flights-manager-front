import {SET_TOURIST, ADD_FLIGHT_TO_TOURIST, DELETE_TOURIST, DELETE_FLIGHT_FROM_TOURIST} from "../actions";

export default function(state = {}, action){
    switch(action.type){
        case SET_TOURIST:
            state = action.payload;
            return state;
        case ADD_FLIGHT_TO_TOURIST:
            return{
                ...state,
                flights: [...state.flights, action.payload]
            };
        case DELETE_FLIGHT_FROM_TOURIST:
            return {
                ...state,
                flights: state.flights.filter(flight => flight.key !== action.payload.flight.key)
            }
    }
    return state;
}