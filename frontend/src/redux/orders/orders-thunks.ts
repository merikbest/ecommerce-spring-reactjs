import {Dispatch} from "redux";

import {loadingOrders, setUserOrders} from "./orders-actions";
import RequestService from '../../utils/request-service';
import {ordersByEmailQuery, ordersByQuery} from "../../utils/graphql-query/orders-query";

export const fetchUserOrders = () => async (dispatch: Dispatch) => {
    dispatch(loadingOrders());
    const response = await RequestService.get("/users/orders", true);
    dispatch(setUserOrders(response.data));
};

export const fetchAllUsersOrders = () => async (dispatch: Dispatch) => {
    dispatch(loadingOrders());
    const response = await RequestService.get("/admin/orders", true);
    dispatch(setUserOrders(response.data));
};

export const fetchUserOrdersByEmail = (email: string | undefined) => async (dispatch: Dispatch) => {
    dispatch(loadingOrders());
    const response = await RequestService.post("/admin/order", {email: email}, true);
    dispatch(setUserOrders(response.data));
};

// graphql
export const fetchUserOrdersByQuery = (email: string | undefined) => async (dispatch: Dispatch) => {
    dispatch(loadingOrders());
    const response = await RequestService.post("/users/graphql/orders", {query: ordersByEmailQuery(email)}, true);
    dispatch(setUserOrders(response.data.data.ordersByEmail));
};

export const fetchAllUsersOrdersByQuery = () => async (dispatch: Dispatch) => {
    dispatch(loadingOrders());
    const response = await RequestService.post("/admin/graphql/orders", {query: ordersByQuery}, true);
    dispatch(setUserOrders(response.data.data.orders));
};

export const fetchUserOrdersByEmailQuery = (email: string | undefined) => async (dispatch: Dispatch) => {
    dispatch(loadingOrders());
    const response = await RequestService.post("/admin/graphql/order", {query: ordersByEmailQuery(email)}, true);
    dispatch(setUserOrders(response.data.data.ordersByEmail));
};
