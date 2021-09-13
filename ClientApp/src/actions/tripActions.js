import axios from "axios";
import axiosfrom from "axios";


export const GET_ALL_TRIPS_REQUEST = 'GET_ALL_TRIPS_REQUESTS';
export const GET_ALL_TRIPS_SUCCESS = 'GET_ALL_TRIPS_SUCCESS';
export const GET_ALL_TRIPS_ERROR   = 'GET_ALL_TRIPS_ERROR';


const getTripsSuccess = payload => ({
    type: GET_ALL_TRIPS_SUCCESS,
    payload
});

const getTripsError = payload => ({
    type: GET_ALL_TRIPS_ERROR,
    payload
})

export const getAllTrips = () => dispath => {
    dispath({type: GET_ALL_TRIPS_REQUEST});
    return axios.get('api/Trips/GetTrips').then(res=> {
        const response = res.data;
        dispath(getTripsSuccess(response));
    }).catch(error => {
        dispath(getTripsError("Something went wrong!"));
        return Promise.reject({});
    })
}