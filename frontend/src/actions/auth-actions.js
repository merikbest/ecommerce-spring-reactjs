import axios from 'axios';

import {LOGIN_SUCCESS, REGISTER_SUCCESS, LOGIN_FAILURE, REGISTER_FAILURE} from "../constants/actions-types";
import {API_BASE_URL} from "../constants/url";

export const login = (data) => async (dispatch) => {
    try {
        const response = await axios.post(API_BASE_URL + "/login", data);

        localStorage.setItem("email", response.data.email);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", response.data.userRole);
        localStorage.setItem("isLoggedIn", true);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response.data
        })
    }
};

export const registration = (data) => async (dispatch) => {
    try {
        const response = await axios.post(API_BASE_URL + "/registration", data);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response.data
        })
    }
};