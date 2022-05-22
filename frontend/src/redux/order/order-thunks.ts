import { Dispatch } from "redux";
import { History, LocationState } from "history";

import {orderAddedFailure, setOrder, setOrderError, setOrderItems, setOrderLoadingState} from "./order-actions";
import RequestService from "../../utils/request-service";
import { LoadingStatus, OrderRequest } from "../../types/types";
import { USERS_ORDER } from "../../constants/urlConstants";
import { ORDER_FINALIZE } from "../../constants/routeConstants";

export const fetchOrderById = (orderId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setOrderLoadingState(LoadingStatus.LOADING));
        const response = await RequestService.get(`${USERS_ORDER}/${orderId}`);
        dispatch(setOrder(response.data));
    } catch (error) {
        dispatch(setOrderError(error.response.data));
    }
};

export const fetchOrderItemsByOrderId = (orderId: string) => async (dispatch: Dispatch) => {
    const response = await RequestService.get(`${USERS_ORDER}/${orderId}/items`);
    dispatch(setOrderItems(response.data));
};

export const addOrder = (order: OrderRequest, history: History<LocationState>) => async (dispatch: Dispatch) => {
    try {
        dispatch(setOrderLoadingState(LoadingStatus.LOADING));
        const response = await RequestService.post(USERS_ORDER, order);
        history.push(ORDER_FINALIZE);
        localStorage.removeItem("perfumes");
        dispatch(setOrder(response.data));
    } catch (error) {
        dispatch(orderAddedFailure(error.response.data));
    }
};
