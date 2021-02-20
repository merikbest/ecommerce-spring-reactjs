import axios from 'axios';

import {API_BASE_URL} from "../../utils/constants/url";
import {showLoader} from "../actions/auth-actions";
import {
    fetchOrderSuccess,
    fetchUserOrdersSuccess,
    orderAddedFailure,
    orderAddedSuccess,
    orderConfirmedSuccess
} from "../actions/order-actions";
import {Dispatch} from "redux";

export const fetchOrder = () => async (dispatch: Dispatch) => {
    dispatch(fetchOrderSuccess());
};

export const addOrder = (order: any, history: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(showLoader());
        await axios.post(API_BASE_URL + "/order", order);
        history.push("/order/finalize");
        localStorage.removeItem("perfumes");
        dispatch(orderAddedSuccess());
    } catch (error) {
        dispatch(orderAddedFailure(error.response.data));
    }
};

export const fetchUserOrders = () => async (dispatch: Dispatch) => {
    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/user/orders",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });
    dispatch(fetchUserOrdersSuccess(response.data));
};

export const finalizeOrder = () => async (dispatch: Dispatch) => {
    const response = await axios.get(API_BASE_URL + "/order/finalize");
    dispatch(orderConfirmedSuccess(response.data));
};
