import {SET_FLIGHT, ADD_TOURIST_TO_FLIGHT, DELETE_TOURIST_FROM_FLIGHT} from "../actions";

export default function(state = {}, action){
    switch(action.type){
        case SET_FLIGHT:
            state = action.payload;
            return state;
        case ADD_TOURIST_TO_FLIGHT:
            return{
                ...state,
                tourists: [...state.tourists, action.payload]
            };
        case DELETE_TOURIST_FROM_FLIGHT:
            return {
                ...state,
                tourists: state.tourists.filter(tourist => tourist.key !== action.payload.tourist.key)
            }
    }
    return state;
}