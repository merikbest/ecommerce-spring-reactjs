import axios from 'axios';

import {
    PERFUME_ADDED_SUCCESS,
    PERFUME_UPDATED_SUCCESS,
    PERFUME_ADDED_FAILURE,
    PERFUME_UPDATED_FAILURE,
    FETCH_USER_SUCCESS,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_ORDERS_SUCCESS, FORM_RESET
} from "../utils/constants/actions-types";
import {API_BASE_URL} from "../utils/constants/url";

export const addPerfume = (data) => async (dispatch) => {
    try {
        const response = await axios({
            method: "POST",
            url: API_BASE_URL + "/admin/add",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": localStorage.getItem("token")
            }
        });

        dispatch({
            type: PERFUME_ADDED_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: PERFUME_ADDED_FAILURE,
            payload: error.response.data
        })
    }
};

export const updatePerfume = (data, history) => async (dispatch) => {
    try {
        const response = await axios({
                method: "PUT",
                url: API_BASE_URL + "/admin/edit",
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": localStorage.getItem("token")
                }
            });

        history.push("/account");

        dispatch({
            type: PERFUME_UPDATED_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: PERFUME_UPDATED_FAILURE,
            payload: error.response.data
        })
    }
};

export const fetchAllUsersOrders = () => async (dispatch) => {
    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/admin/orders",
        headers: {
            "Content-Type" : "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });

    dispatch({
        type: FETCH_ALL_USERS_ORDERS_SUCCESS,
        payload: response.data
    })
};

export const fetchAllUsers = () => async (dispatch) => {
    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/admin/user/all",
        headers: {
            "Content-Type" : "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });

    dispatch({
        type: FETCH_ALL_USERS_SUCCESS,
        payload: response.data
    })
};

export const fetchUser = (id) => async (dispatch) => {
    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/admin/user/" + id,
        headers: {
            "Content-Type" : "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });

    dispatch({
        type: FETCH_USER_SUCCESS,
        payload: response.data
    })
};

export const formReset = () => async (dispatch) => {
    dispatch({
        type: FORM_RESET
    })
};
