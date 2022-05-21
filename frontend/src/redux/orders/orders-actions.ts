import { Order } from "../../types/types";
import {
    LOADING_ORDERS,
    LoadingOrdersActionType,
    RESET_ORDERS_STATE,
    ResetOrdersStateActionType,
    SET_USER_ORDERS,
    SetUserOrdersActionType
} from "./orders-action-types";

export const loadingOrders = (): LoadingOrdersActionType => ({
    type: LOADING_ORDERS
});

export const setUserOrders = (orders: Array<Order>): SetUserOrdersActionType => ({
    type: SET_USER_ORDERS,
    payload: orders
});

export const resetOrders = (): ResetOrdersStateActionType => ({
    type: RESET_ORDERS_STATE
});
