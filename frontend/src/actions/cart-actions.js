import axios from 'axios';

import {FETCH_CART, PERFUME_ADDED_TO_CART, PERFUME_REMOVED_FROM_CART} from "../constants/actions-types";
import {API_BASE_URL} from "../constants/url";

export const fetchCart = () => async (dispatch) => {
    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/cart/" + localStorage.getItem("email"),
        headers: {
            "Content-Type" : "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });

    dispatch({
        type: FETCH_CART,
        payload: response.data
    })
};

export const addToCart = (id) => async (dispatch) => {
    const response = await axios({
        method: "POST",
        url: API_BASE_URL + "/cart/add",
        data: id,
        headers: {
            "Content-Type" : "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });

    dispatch({
        type: PERFUME_ADDED_TO_CART,
        payload: response.data
    })
};

export const removeFromCart = (perfume) => async (dispatch) => {
    const response = await axios({
        method: "POST",
        url: API_BASE_URL + "/cart/remove",
        data: perfume,
        headers: {
            "Content-Type" : "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });

    dispatch({
        type: PERFUME_REMOVED_FROM_CART,
        payload: response.data
    })
};
