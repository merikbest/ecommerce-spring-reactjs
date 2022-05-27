import { createAsyncThunk } from "@reduxjs/toolkit";

import { Order } from "../../types/types";
import RequestService from "../../utils/request-service";
import {
    ADMIN_GRAPHQL_ORDER,
    ADMIN_GRAPHQL_ORDERS,
    ADMIN_ORDER,
    ADMIN_ORDERS,
    USERS_GRAPHQL_ORDERS,
    USERS_ORDERS
} from "../../constants/urlConstants";
import {ordersByEmailQuery, ordersByQuery} from "../../utils/graphql-query/orders-query";

export const fetchUserOrders = createAsyncThunk<Array<Order>>("orders/fetchUserOrders", async () => {
    const response = await RequestService.get(USERS_ORDERS, true);
    return response.data;
});

export const fetchAllUsersOrders = createAsyncThunk<Array<Order>>("orders/fetchAllUsersOrders", async () => {
    const response = await RequestService.get(ADMIN_ORDERS, true);
    return response.data;
});

export const fetchUserOrdersByEmail = createAsyncThunk<Array<Order>, string>(
    "orders/fetchUserOrdersByEmail",
    async (email) => {
        const response = await RequestService.get(`${ADMIN_ORDER}/${email}`, true);
        return response.data;
    }
);

// graphql
export const fetchUserOrdersByQuery = createAsyncThunk<Array<Order>, string>(
    "orders/fetchUserOrdersByQuery",
    async (email) => {
        const response = await RequestService.post(USERS_GRAPHQL_ORDERS, { query: ordersByEmailQuery(email) }, true);
        return response.data.data.ordersByEmail;
    }
);

export const fetchAllUsersOrdersByQuery = createAsyncThunk<Array<Order>>(
    "orders/fetchAllUsersOrdersByQuery",
    async () => {
        const response = await RequestService.post(ADMIN_GRAPHQL_ORDERS, { query: ordersByQuery }, true);
        return response.data.data.orders;
    }
);

export const fetchUserOrdersByEmailQuery = createAsyncThunk<Array<Order>, string>(
    "orders/fetchUserOrdersByEmailQuery",
    async (email) => {
        const response = await RequestService.post(ADMIN_GRAPHQL_ORDER, { query: ordersByEmailQuery(email) }, true);
        return response.data.data.ordersByEmail;
    }
);
