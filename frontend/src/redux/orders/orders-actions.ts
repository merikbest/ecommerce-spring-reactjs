import {Order} from "../../types/types";
import {
    LOADING_ORDERS,
    FETCH_USER_ORDERS_BY_QUERY_SUCCESS,
    FETCH_USER_ORDERS_SUCCESS,
    FetchUserOrdersActionType,
    FetchUserOrdersByQueryActionType,
    LoadingOrdersActionType
} from "./orders-action-types";

export const loadingOrders = (): LoadingOrdersActionType => ({
    type: LOADING_ORDERS
});

export const fetchUserOrdersSuccess = (orders: Array<Order>): FetchUserOrdersActionType => ({
    type: FETCH_USER_ORDERS_SUCCESS,
    payload: orders
});

export const fetchUserOrdersByQuerySuccess = (orders: Array<Order>): FetchUserOrdersByQueryActionType => ({
    type: FETCH_USER_ORDERS_BY_QUERY_SUCCESS,
    payload: orders
});
