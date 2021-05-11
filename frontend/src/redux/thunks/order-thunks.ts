import {Dispatch} from "redux";

import {showLoader} from "../actions/auth-actions";
import {
    fetchOrderSuccess,
    fetchUserOrdersSuccess,
    orderAddedFailure,
    orderAddedSuccess
} from "../actions/order-actions";
import RequestService from '../../utils/request-service';

export const fetchOrder = () => async (dispatch: Dispatch) => {
    dispatch(fetchOrderSuccess());
};

export const addOrder = (order: any, history: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(showLoader());
        const response = await RequestService.post("/users/order", order);
        history.push("/order/finalize");
        localStorage.removeItem("perfumes");
        dispatch(orderAddedSuccess(response.data));
    } catch (error) {
        dispatch(orderAddedFailure(error.response?.data));
    }
};

export const fetchUserOrders = () => async (dispatch: Dispatch) => {
    const response = await RequestService.get("/users/orders", true);
    dispatch(fetchUserOrdersSuccess(response.data));
};
