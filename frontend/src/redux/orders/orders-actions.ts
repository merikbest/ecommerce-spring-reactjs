import { LoadingStatus, Order } from "../../types/types";
import {
    RESET_ORDERS_STATE,
    ResetOrdersStateActionType,
    SET_ORDERS_LOADING_STATE,
    SET_USER_ORDERS,
    SetOrdersLoadingStateActionType,
    SetUserOrdersActionType
} from "./orders-action-types";

export const setOrdersLoadingState = (status: LoadingStatus): SetOrdersLoadingStateActionType => ({
    type: SET_ORDERS_LOADING_STATE,
    payload: status
});

export const setUserOrders = (orders: Array<Order>): SetUserOrdersActionType => ({
    type: SET_USER_ORDERS,
    payload: orders
});

export const resetOrders = (): ResetOrdersStateActionType => ({
    type: RESET_ORDERS_STATE
});
