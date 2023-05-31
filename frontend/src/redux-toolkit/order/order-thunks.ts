import { createAsyncThunk } from "@reduxjs/toolkit";
import { History, LocationState } from "history";

import { OrderError, OrderItemResponse, OrderRequest, OrderResponse } from "../../types/types";
import RequestService from "../../utils/request-service";
import { ORDER } from "../../constants/urlConstants";
import { ORDER_FINALIZE } from "../../constants/routeConstants";

export const fetchOrderById = createAsyncThunk<OrderResponse, string, { rejectValue: string }>(
    "order/fetchOrderById",
    async (orderId, thunkApi) => {
        try {
            const response = await RequestService.get(`${ORDER}/${orderId}`);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const fetchOrderItemsByOrderId = createAsyncThunk<Array<OrderItemResponse>, string>(
    "order/fetchOrderItemsByOrderId",
    async (orderId) => {
        const response = await RequestService.get(`${ORDER}/${orderId}/items`);
        return response.data;
    }
);

export const addOrder = createAsyncThunk<
    OrderResponse,
    { order: OrderRequest; history: History<LocationState> },
    { rejectValue: OrderError }
>("order/addOrder", async ({ order, history }, thunkApi) => {
    try {
        const response = await RequestService.post(ORDER, order);
        history.push(ORDER_FINALIZE);
        localStorage.removeItem("perfumes");
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});
