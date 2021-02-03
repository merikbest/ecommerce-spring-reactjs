import axios from 'axios';

import {
    FETCH_CART_SUCCESS,
    LOADING_CART,
    STOP_LOADING_CART,
    CALCULATE_CART_PRICE_SUCCESS,
    CLEAR_CART
} from "../utils/constants/actions-types";
import {API_BASE_URL} from "../utils/constants/url";

export const fetchCart = (data) => async (dispatch) => {
    dispatch({
        type: LOADING_CART
    })

    const response = await axios.post(API_BASE_URL + "/cart", data);

    const perfumes = new Map(JSON.parse(localStorage.getItem("perfumes")));
    let total = 0;

    perfumes.forEach((value, key) => {
        const perfume = response.data.find(perfume => perfume.id === key);
        total = total + (perfume.price * value);
    });

    dispatch({
        type: FETCH_CART_SUCCESS,
        payload: response.data
    })

    dispatch({
        type: CALCULATE_CART_PRICE_SUCCESS,
        payload: total
    })
};

export const calculateCartPrice = (perfumes) => (dispatch) => {
    const perfumesFromLocalStorage = new Map(JSON.parse(localStorage.getItem("perfumes")));
    let total = 0;

    perfumesFromLocalStorage.forEach((value, key) => {
        const perfume = perfumes.find(perfume => perfume.id === key);
        total += perfume.price * value;
    });

    dispatch({
        type: CALCULATE_CART_PRICE_SUCCESS,
        payload: total
    })
};

export const clearCart = () => (dispatch) => {
    dispatch({
        type: CLEAR_CART
    })
};

export const loadCart = () => (dispatch) => {
    dispatch({
        type: STOP_LOADING_CART
    })
};
