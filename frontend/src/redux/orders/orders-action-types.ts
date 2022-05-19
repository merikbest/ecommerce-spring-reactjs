import {Order} from "../../types/types";

export const LOADING_ORDERS = "orders/LOADING_ORDERS";
export const FETCH_USER_ORDERS_SUCCESS = "orders/FETCH_ALL_ORDERS_SUCCESS";
export const FETCH_USER_ORDERS_BY_QUERY_SUCCESS = "orders/FETCH_USER_ORDERS_BY_QUERY_SUCCESS";

export type LoadingOrdersActionType = {
    type: typeof LOADING_ORDERS
};

export type FetchUserOrdersActionType = {
    type: typeof FETCH_USER_ORDERS_SUCCESS,
    payload: Array<Order>
};

export type FetchUserOrdersByQueryActionType = {
    type: typeof FETCH_USER_ORDERS_BY_QUERY_SUCCESS,
    payload: Array<Order>
};

export type OrdersActionTypes =
    | LoadingOrdersActionType
    | FetchUserOrdersActionType
    | FetchUserOrdersByQueryActionType;
