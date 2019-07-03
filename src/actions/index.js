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




export function fetchTourists(){
    const data = [
            {
                key: 1,
                name: 'John',
                surname: 'Brown',
                gender: 'M',
                country: 'USA',
                notes: ' ',
                birthdate: '01-01-1987',
                flights: [
                    {
                        key: 1,
                        departureDatetime: "24-06-2019 13:00",
                        arrivalDatetime: "24-06-2019 15:30",
                        numberOfSeats:  200,
                        price: 100.00
                    },
                    {
                        key: 2,
                        departureDatetime: "29-06-2019 09:00",
                        arrivalDatetime: "29-06-2019 11:30",
                        numberOfSeats:  150,
                        price: 90.00
                    }]
            },
            {
                key: 2,
                name: 'Thomas',
                surname: 'Brown',
                gender: 'M',
                country: 'UK',
                notes: '',
                birthdate: '01-01-1989',
                flights: [
                    {
                        key: 3,
                        departureDatetime: "21-06-2019 08:00",
                        arrivalDatetime: "21-06-2019 11:30",
                        numberOfSeats: 2,
                        price: 1000.00
                    },
                    {
                        key: 4,
                        departureDatetime: "23-06-2019 18:00",
                        arrivalDatetime: "23-06-2019 23:00",
                        numberOfSeats:  1,
                        price: 9000.00
                    }]
            },
        ];

        return{
            type: FETCH_TOURISTS,
            payload: data
        }
}

export function addTourist(tourist){
    tourist.flights = []
    return{
        type: ADD_TOURIST,
        payload: tourist
    }
}

export function deleteTourist(tourist){
    return{
        type: DELETE_TOURIST,
        payload: tourist
    }
}

export function updateTouristsList(tourist){
    return{
        type: UPDATE_TOURISTS_LIST,
        payload: tourist
    }
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
    const data =
    [                       {
                                  key: 1,
                                  departureDatetime: "24-06-2019 13:00",
                                  arrivalDatetime: "24-06-2019 15:30",
                                  numberOfSeats:  200,
                                  price: 100.00
                              },
                              {
                                  key: 2,
                                  departureDatetime: "29-06-2019 09:00",
                                  arrivalDatetime: "29-06-2019 11:30",
                                  numberOfSeats:  150,
                                  price: 90.00
                              },

                         {
                             key: 3,
                             departureDatetime: "21-06-2019 08:00",
                             arrivalDatetime: "21-06-2019 11:30",
                             numberOfSeats: 2,
                             price: 1000.00
                         },
                         {
                             key: 4,
                             departureDatetime: "23-06-2019 18:00",
                             arrivalDatetime: "23-06-2019 23:00",
                             numberOfSeats:  1,
                             price: 9000.00
                         },
                         {
                             key: 5,
                             departureDatetime: "15-06-2019 08:00",
                             arrivalDatetime: "15-06-2019 12:00",
                             numberOfSeats:  5,
                             price: 2000.00
                         }]



        return{
            type: FETCH_FLIGHTS,
            payload: data
        }
}


export function addFlight(flight){
    return{
        type: ADD_FLIGHT,
        payload: flight
    }
}

export function deleteFlight(flight){
    return{
        type: DELETE_FLIGHT,
        payload: flight
    }
}

export function updateFlightsList(flight){
    return{
        type: UPDATE_FLIGHT_LIST,
        payload: flight
    }
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