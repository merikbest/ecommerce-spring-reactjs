import {Order} from "../../types/types";

export const LOADING_ORDERS = "orders/LOADING_ORDERS";
export const SET_USER_ORDERS = "orders/SET_USER_ORDERS";
export const RESET_ORDERS_STATE = "orders/RESET_ORDERS_STATE";

export type LoadingOrdersActionType = {
    type: typeof LOADING_ORDERS
};

export type SetUserOrdersActionType = {
    type: typeof SET_USER_ORDERS,
    payload: Array<Order>
};

export type ResetOrdersStateActionType = {
    type: typeof RESET_ORDERS_STATE
};

export type OrdersActionTypes =
    | LoadingOrdersActionType
    | SetUserOrdersActionType
    | ResetOrdersStateActionType;
