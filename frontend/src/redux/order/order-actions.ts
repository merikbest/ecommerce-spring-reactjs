import {Order, OrderError} from "../../types/types";
import {
    LOADING_ORDER,
    LoadingOrderActionType,
    ORDER_ADDED_FAILURE,
    ORDER_ADDED_SUCCESS,
    OrderAddedFailureActionType,
    OrderAddedSuccessActionType,
    RESET_ORDER_STATE,
    ResetOrderStateActionType,
} from "./order-action-types";

export const loadingOrder = (): LoadingOrderActionType => ({
    type: LOADING_ORDER
});

export const resetOrderState = (): ResetOrderStateActionType => ({
    type: RESET_ORDER_STATE
});

export const orderAddedSuccess = (order: Order): OrderAddedSuccessActionType => ({
    type: ORDER_ADDED_SUCCESS,
    payload: order
});

export const orderAddedFailure = (errors: OrderError): OrderAddedFailureActionType => ({
    type: ORDER_ADDED_FAILURE,
    payload: errors
});

