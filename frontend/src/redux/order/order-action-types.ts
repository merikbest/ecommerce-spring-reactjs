import {Order, OrderError} from "../../types/types";

export const LOADING_ORDER = "order/LOADING_ORDER";
export const RESET_ORDER_STATE = "order/RESET_ORDER_STATE";
export const ORDER_ADDED_SUCCESS = "order/ORDER_ADDED_SUCCESS";
export const ORDER_ADDED_FAILURE = "order/ORDER_ADDED_FAILURE";

export type LoadingOrderActionType = {
    type: typeof LOADING_ORDER
};

export type ResetOrderStateActionType = {
    type: typeof RESET_ORDER_STATE
};

export type OrderAddedSuccessActionType = {
    type: typeof ORDER_ADDED_SUCCESS,
    payload: Order
};

export type OrderAddedFailureActionType = {
    type: typeof ORDER_ADDED_FAILURE,
    payload: OrderError
};

export type OrderActionTypes =
    | LoadingOrderActionType
    | ResetOrderStateActionType
    | OrderAddedSuccessActionType
    | OrderAddedFailureActionType;
