import {LoadingStatus, Order, OrderError, OrderItem} from "../../types/types";

export const SET_ORDER_LOADING_STATE = "order/SET_ORDER_LOADING_STATE";
export const RESET_ORDER_STATE = "order/RESET_ORDER_STATE";
export const SET_ORDER = "order/SET_ORDER";
export const SET_ORDER_ITEMS = "order/SET_ORDER_ITEMS";
export const SET_ORDER_ERROR = "order/SET_ORDER_ERROR";
export const ORDER_ADDED_FAILURE = "order/ORDER_ADDED_FAILURE";

export type SetOrderLoadingStateActionType = {
    type: typeof SET_ORDER_LOADING_STATE;
    payload: LoadingStatus;
};

export type ResetOrderStateActionType = {
    type: typeof RESET_ORDER_STATE;
};

export type SetOrderActionType = {
    type: typeof SET_ORDER;
    payload: Order;
};

export type SetOrderItemsActionType = {
    type: typeof SET_ORDER_ITEMS;
    payload: Array<OrderItem>;
};

export type SetOrderErrorActionType = {
    type: typeof SET_ORDER_ERROR;
    payload: string;
};

export type OrderAddedFailureActionType = {
    type: typeof ORDER_ADDED_FAILURE;
    payload: OrderError;
};

export type OrderActionTypes =
    | SetOrderLoadingStateActionType
    | ResetOrderStateActionType
    | SetOrderActionType
    | SetOrderItemsActionType
    | SetOrderErrorActionType
    | OrderAddedFailureActionType;
