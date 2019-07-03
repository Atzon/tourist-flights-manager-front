import {FETCH_TOURISTS, DELETE_TOURIST, ADD_TOURIST, UPDATE_TOURISTS_LIST, DELETE_FLIGHT_FROM_TOURIST} from "../actions";

export default function(state = null, action){
    switch(action.type){
        case FETCH_TOURISTS:
            state = action.payload;
            return state;
        case DELETE_TOURIST:
            return state.filter(tourist => tourist.key !== action.payload.key);
        case ADD_TOURIST:
            return [action.payload, ...state];
        case UPDATE_TOURISTS_LIST:
            return state.map(tourist => {
                if (tourist.key === action.payload.key) {
                    return action.payload
                }
                    return tourist
                });
    }
    return state;
}