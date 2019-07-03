import axios from 'axios';

export const SET_FLIGHT = 'SET_FLIGHT';
export const UPDATE_FLIGHT_LIST = 'UPDATE_FLIGHT_LIST';
export const FETCH_FLIGHTS = 'FETCH_FLIGHTS';
export const ADD_TOURIST_TO_FLIGHT = 'ADD_TOURIST_TO_FLIGHT';
export const DELETE_FLIGHT = 'DELETE_FLIGHT';
export const ADD_FLIGHT = 'ADD_FLIGHT';
export const DELETE_TOURIST_FROM_FLIGHT = 'DELETE_TOURIST_FROM_FLIGHT';

export const SET_TOURIST = 'SET_TOURIST';
export const UPDATE_TOURISTS_LIST = 'UPDATE_TOURISTS_LIST';
export const FETCH_TOURISTS = 'FETCH_TOURISTS';
export const ADD_FLIGHT_TO_TOURIST = 'ADD_FLIGHT_TO_TOURIST';
export const DELETE_TOURIST = 'DELETE_TOURIST';
export const ADD_TOURIST = 'ADD_TOURIST';
export const DELETE_FLIGHT_FROM_TOURIST = 'DELETE_FLIGHT_FROM_TOURIST';


const URL = 'http://localhost:8080'

export function fetchTourists(){
    const request = axios.get(`${URL}/tourists`);

    return(dispatch) => {
            request.then(({data}) =>{
                dispatch({type: FETCH_TOURISTS, payload: data});
            });
    };

}

export function addTourist(tourist){
    tourist.flights = []

    const request = axios.post(`${URL}/tourists`, {tourist});

    return(dispatch) => {
        request.then(({data}) =>{
             dispatch({type: ADD_TOURIST, payload: tourist});
     });
        };


}

export function deleteTourist(tourist){

    const request = axios.delete(`${URL}/tourists/${tourist.key}`);

    return(dispatch) => {
        request.then(({data}) =>{
             dispatch({type: DELETE_TOURIST, payload: tourist});
     });
        };
}

export function updateTouristsList(tourist){

    const request = axios.put(`${URL}/tourists/${tourist.key}`, {tourist});

    return(dispatch) => {
        request.then(({data}) =>{
             dispatch({type: UPDATE_TOURISTS_LIST, payload: tourist});
     });
        };


}

export function deleteFlightFromCurrentTourist(tourist, flight){
    return{
        type: DELETE_FLIGHT_FROM_TOURIST,
        payload: {tourist: tourist, flight: flight}
    }
}

export function addFlightToCurrentTourist(flight){
    return{
        type: ADD_FLIGHT_TO_TOURIST,
        payload: flight
    }
}

export function setCurrentTourist(tourist){
    return{
        type: SET_TOURIST,
        payload: tourist
    }
}




export function fetchFlights(){

    const request = axios.get(`${URL}/flights`);

    return(dispatch) => {
            request.then(({data}) =>{
                dispatch({type: FETCH_FLIGHTS, payload: data});
            });
    };

}


export function addFlight(flight){
    flight.tourists = []

    const request = axios.post(`${URL}/flights`, {flight});

    return(dispatch) => {
                request.then(({data}) =>{
                     dispatch({type: ADD_FLIGHT, payload: flight});
             });
            };
}

export function deleteFlight(flight){

    const request = axios.delete(`${URL}/flights/${flight.key}`);

    return(dispatch) => {
        request.then(({data}) =>{
             dispatch({type: DELETE_FLIGHT, payload: flight});
     });
        };

}

export function updateFlightsList(flight){

    const request = axios.put(`${URL}/flights/${flight.key}`, {flight});

    return(dispatch) => {
        request.then(({data}) =>{
             dispatch({type: UPDATE_FLIGHT_LIST, payload: flight});
     });
        };
}

export function deleteTouristFromCurrentFlight(flight, tourist){
    return{
        type: DELETE_TOURIST_FROM_FLIGHT,
        payload: {tourist: tourist, flight: flight}
    }
}

export function addTouristToCurrentFlight(tourist){
    return{
        type: ADD_TOURIST_TO_FLIGHT,
        payload: tourist
    }
}

export function setCurrentFlight(flight){
    return{
        type: SET_FLIGHT,
        payload: flight
    }
}