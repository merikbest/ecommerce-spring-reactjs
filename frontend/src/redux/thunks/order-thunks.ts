import axios from 'axios';

import {API_BASE_URL} from "../../utils/constants/url";
import {showLoader} from "../actions/auth-actions";
import {
    fetchOrderSuccess,
    fetchUserOrdersSuccess,
    orderAddedFailure,
    orderAddedSuccess
} from "../actions/order-actions";
import {Dispatch} from "redux";

export const fetchOrder = () => async (dispatch: Dispatch) => {
    dispatch(fetchOrderSuccess());
};

export const addOrder = (order: any, history: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(showLoader());
        const response = await axios.post(API_BASE_URL + "/users/order", order);
        history.push("/order/finalize");
        localStorage.removeItem("perfumes");
        dispatch(orderAddedSuccess(response.data));
    } catch (error) {
        dispatch(orderAddedFailure(error.response.data));
    }
};

export const fetchUserOrders = () => async (dispatch: Dispatch) => {
    const response = await axios({
        method: "GET",
        url: API_BASE_URL + "/users/orders",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });
    dispatch(fetchUserOrdersSuccess(response.data));
};
