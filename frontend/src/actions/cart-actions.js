import axios from 'axios';

import {FETCH_CART_SUCCESS, LOADING_CART, STOP_LOADING_CART} from "../utils/constants/actions-types";
import {API_BASE_URL} from "../utils/constants/url";

export const fetchCart = (data) => async (dispatch) => {
    dispatch({
        type: LOADING_CART
    })

    const response = await axios.post(API_BASE_URL + "/cart", data);

    dispatch({
        type: FETCH_CART_SUCCESS,
        payload: response.data
    })
};

export const loadCart = () => async (dispatch) => {
    dispatch({
        type: STOP_LOADING_CART
    })
};
