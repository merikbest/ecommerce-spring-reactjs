import { Dispatch } from "redux";

import { setOrdersLoadingState, setUserOrders } from "./orders-actions";
import RequestService from "../../utils/request-service";
import { ordersByEmailQuery, ordersByQuery } from "../../utils/graphql-query/orders-query";
import {
    ADMIN_GRAPHQL_ORDER,
    ADMIN_GRAPHQL_ORDERS,
    ADMIN_ORDER,
    ADMIN_ORDERS,
    USERS_GRAPHQL_ORDERS,
    USERS_ORDERS
} from "../../constants/urlConstants";
import { LoadingStatus } from "../../types/types";

export const fetchUserOrders = () => async (dispatch: Dispatch) => {
    dispatch(setOrdersLoadingState(LoadingStatus.LOADING));
    const response = await RequestService.get(USERS_ORDERS, true);
    dispatch(setUserOrders(response.data));
};

export const fetchAllUsersOrders = () => async (dispatch: Dispatch) => {
    dispatch(setOrdersLoadingState(LoadingStatus.LOADING));
    const response = await RequestService.get(ADMIN_ORDERS, true);
    dispatch(setUserOrders(response.data));
};

export const fetchUserOrdersByEmail = (email: string) => async (dispatch: Dispatch) => {
    dispatch(setOrdersLoadingState(LoadingStatus.LOADING));
    const response = await RequestService.get(`${ADMIN_ORDER}/${email}`, true);
    dispatch(setUserOrders(response.data));
};

// graphql
export const fetchUserOrdersByQuery = (email: string) => async (dispatch: Dispatch) => {
    dispatch(setOrdersLoadingState(LoadingStatus.LOADING));
    const response = await RequestService.post(USERS_GRAPHQL_ORDERS, { query: ordersByEmailQuery(email) }, true);
    dispatch(setUserOrders(response.data.data.ordersByEmail));
};

export const fetchAllUsersOrdersByQuery = () => async (dispatch: Dispatch) => {
    dispatch(setOrdersLoadingState(LoadingStatus.LOADING));
    const response = await RequestService.post(ADMIN_GRAPHQL_ORDERS, { query: ordersByQuery }, true);
    dispatch(setUserOrders(response.data.data.orders));
};

export const fetchUserOrdersByEmailQuery = (email: string) => async (dispatch: Dispatch) => {
    dispatch(setOrdersLoadingState(LoadingStatus.LOADING));
    const response = await RequestService.post(ADMIN_GRAPHQL_ORDER, { query: ordersByEmailQuery(email) }, true);
    dispatch(setUserOrders(response.data.data.ordersByEmail));
};
