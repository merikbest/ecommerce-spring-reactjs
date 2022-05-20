import {Order, OrderError} from "../../types/types";

export const LOADING_ORDER = "order/LOADING_ORDER";
export const RESET_ORDER_STATE = "order/RESET_ORDER_STATE";
export const SET_ORDER = "order/SET_ORDER";
export const ORDER_ADDED_FAILURE = "order/ORDER_ADDED_FAILURE";

export type LoadingOrderActionType = {
    type: typeof LOADING_ORDER
};

export type ResetOrderStateActionType = {
    type: typeof RESET_ORDER_STATE
};

export type SetOrderActionType = {
    type: typeof SET_ORDER,
    payload: Order
};

export type OrderAddedFailureActionType = {
    type: typeof ORDER_ADDED_FAILURE,
    payload: OrderError
};

export type OrderActionTypes =
    | LoadingOrderActionType
    | ResetOrderStateActionType
    | SetOrderActionType
    | OrderAddedFailureActionType;
