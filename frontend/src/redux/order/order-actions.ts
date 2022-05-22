import { LoadingStatus, Order, OrderError, OrderItem } from "../../types/types";
import {
    ORDER_ADDED_FAILURE,
    OrderAddedFailureActionType,
    RESET_ORDER_STATE,
    ResetOrderStateActionType,
    SET_ORDER,
    SET_ORDER_ERROR,
    SET_ORDER_ITEMS,
    SET_ORDER_LOADING_STATE,
    SetOrderActionType,
    SetOrderErrorActionType,
    SetOrderItemsActionType,
    SetOrderLoadingStateActionType
} from "./order-action-types";

export const setOrderLoadingState = (status: LoadingStatus): SetOrderLoadingStateActionType => ({
    type: SET_ORDER_LOADING_STATE,
    payload: status
});

export const resetOrderState = (): ResetOrderStateActionType => ({
    type: RESET_ORDER_STATE
});

export const setOrder = (order: Order): SetOrderActionType => ({
    type: SET_ORDER,
    payload: order
});

export const setOrderItems = (orderItems: Array<OrderItem>): SetOrderItemsActionType => ({
    type: SET_ORDER_ITEMS,
    payload: orderItems
});

export const setOrderError = (errorMessage: string): SetOrderErrorActionType => ({
    type: SET_ORDER_ERROR,
    payload: errorMessage
});

export const orderAddedFailure = (errors: OrderError): OrderAddedFailureActionType => ({
    type: ORDER_ADDED_FAILURE,
    payload: errors
});
