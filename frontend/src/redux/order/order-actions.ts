import {Order, OrderError} from "../../types/types";
import {
    LOADING_ORDER,
    LoadingOrderActionType,
    ORDER_ADDED_FAILURE,
    SET_ORDER,
    OrderAddedFailureActionType,
    SetOrderActionType,
    RESET_ORDER_STATE,
    ResetOrderStateActionType,
} from "./order-action-types";

export const loadingOrder = (): LoadingOrderActionType => ({
    type: LOADING_ORDER
});

export const resetOrderState = (): ResetOrderStateActionType => ({
    type: RESET_ORDER_STATE
});

export const setOrder = (order: Order): SetOrderActionType => ({
    type: SET_ORDER,
    payload: order
});

export const orderAddedFailure = (errors: OrderError): OrderAddedFailureActionType => ({
    type: ORDER_ADDED_FAILURE,
    payload: errors
});

