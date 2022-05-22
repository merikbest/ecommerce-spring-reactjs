import { LoadingStatus, Order } from "../../types/types";

export const SET_ORDERS_LOADING_STATE = "orders/SET_ORDERS_LOADING_STATE";
export const SET_USER_ORDERS = "orders/SET_USER_ORDERS";
export const RESET_ORDERS_STATE = "orders/RESET_ORDERS_STATE";

export type SetOrdersLoadingStateActionType = {
    type: typeof SET_ORDERS_LOADING_STATE;
    payload: LoadingStatus;
};

export type SetUserOrdersActionType = {
    type: typeof SET_USER_ORDERS;
    payload: Array<Order>;
};

export type ResetOrdersStateActionType = {
    type: typeof RESET_ORDERS_STATE;
};

export type OrdersActionTypes = SetOrdersLoadingStateActionType | SetUserOrdersActionType | ResetOrdersStateActionType;
