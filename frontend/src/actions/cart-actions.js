import axios from 'axios';

import {
    FETCH_CART_SUCCESS,
    PERFUME_ADDED_TO_CART_SUCCESS,
    PERFUME_REMOVED_FROM_CART_SUCCESS,
    LOADING_CART
} from "../utils/constants/actions-types";
import {API_BASE_URL} from "../utils/constants/url";

export const fetchCart = () => async (dispatch) => {
    dispatch({
        type: LOADING_CART
    })

    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/cart/" + localStorage.getItem("email"),
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });

    dispatch({
        type: FETCH_CART_SUCCESS,
        payload: response.data
    })
};

export const addToCart = (perfume, history) => async (dispatch) => {
    await axios({
        method: "POST",
        url: API_BASE_URL + "/cart/add",
        data: perfume,
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    })

    dispatch({
        type: PERFUME_ADDED_TO_CART_SUCCESS,
    })

    history.push("/cart")
};

export const removeFromCart = (perfume) => async (dispatch) => {
    const response = await axios({
        method: "POST",
        url: API_BASE_URL + "/cart/remove",
        data: perfume,
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });

    dispatch({
        type: PERFUME_REMOVED_FROM_CART_SUCCESS,
        payload: response.data
    })
};
