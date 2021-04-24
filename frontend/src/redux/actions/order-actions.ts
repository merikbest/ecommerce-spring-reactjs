import {Order, OrderError} from "../../types/types";
import {
    FETCH_ORDER_SUCCESS,
    FETCH_USER_ORDERS_SUCCESS,
    ORDER_ADDED_FAILURE,
    ORDER_ADDED_SUCCESS,
    FetchOrderSuccessActionType,
    FetchUserOrdersActionType,
    OrderAddedFailureActionType,
    OrderAddedSuccessActionType
} from "../action-types/order-action-types";

export const fetchOrderSuccess = (): FetchOrderSuccessActionType => ({
    type: FETCH_ORDER_SUCCESS
});

export const orderAddedSuccess = (order: Order): OrderAddedSuccessActionType => ({
    type: ORDER_ADDED_SUCCESS,
    payload: order
});

export const orderAddedFailure = (errors: OrderError): OrderAddedFailureActionType => ({
    type: ORDER_ADDED_FAILURE,
    payload: errors
});

export const fetchUserOrdersSuccess = (orders: Array<Order>): FetchUserOrdersActionType => ({
    type: FETCH_USER_ORDERS_SUCCESS,
    payload: orders
});
